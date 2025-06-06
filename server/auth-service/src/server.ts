import http from 'http';

import { CustomError, IAuthPayload, IErrorResponse, winstonLogger } from '@liben_hailu/sm-shared';
import { Channel } from 'amqplib';
import compression from 'compression';
import cors from 'cors';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import hpp from 'hpp';
import { verify } from 'jsonwebtoken';
import { Logger } from 'winston';
import { config } from './config';
import { checkConnection } from './elasticsearch';
import { createConnection } from './queues/connection';
import { appRoutes } from './routes';

const SERVER_PORT = 4002;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authenticationServer', 'debug');

export let authChannel: Channel;

export function start(app: Application): void {
    securityMiddleware(app);
    standardMiddleware(app);
    routesMiddleware(app);
    startQueues();
    startElasticSearch();
    authErrorHandler(app);
    startServer(app);
}

function securityMiddleware(app: Application): void {
    app.set('trust proxy', 1);
    app.use(hpp());
    app.use(helmet());
    app.use(
        cors({
            origin: config.API_GATEWAY_URL,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        })
    );
    app.use((req: Request, _res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const payload: IAuthPayload = verify(token, config.JWT_TOKEN!) as IAuthPayload;
            req.currentUser = payload;
        }
        next();
    });
}

function standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
}

function routesMiddleware(app: Application): void {
    appRoutes(app);
}

async function startQueues(): Promise<void> {
    authChannel = await createConnection() as Channel;
}

function startElasticSearch(): void {
    checkConnection();
}

function authErrorHandler(app: Application): void {
    app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
        log.log('error', `AuthService ${error.comingFrom}:`, error);
        if (error instanceof CustomError) {
            res.status(error.statusCode).json(error.serializeErrors());
        }
        next();
    });
}

function startServer(app: Application): void {
    try {
        const httpServer: http.Server = new http.Server(app);
        log.info(`Authentication server has started with process id ${process.pid}`);
        httpServer.listen(SERVER_PORT, () => {
            log.info(`Authentication server running on port ${SERVER_PORT}`);
        });
    } catch (error) {
        log.log('error', 'AuthService startServer() method error:', error);
    }
}