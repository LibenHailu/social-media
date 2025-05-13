import { Application } from 'express';

import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './services/auth-middleware';
import { currentUserRoutes } from './routes/current-user';

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
    app.use('', healthRoutes.routes());
    app.use(BASE_PATH, verifyGatewayRequest, authRoutes.routes());

    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
};



import JWT from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"


export function verifyGatewayRequest(req: Request, _res: Response, next: NextFunction): void {

    if (!req.headers?.gatewaytoken) {
        console.log("first")
        console.log("first")
        console.log("first")
        console.log("first")
        console.log("first")
    }

    const token: string = req.headers?.gatewaytoken as string
    if (!token) {
        console.log("sec")
        console.log("sec")
        console.log("sec")
        console.log("sec")
        // throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')
    }

    try {
    const tokens: string[] = ['auth', 'user', 'git', 'buyer', 'message', 'order', 'review']
        const payload: { id: string, iat: number } = JWT.verify(token, '1282722b942e08c8a6cb033aa6ce850e') as { id: string, iat: number }
        if (!tokens.includes(payload.id)) {
            // throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload is invalid')
        }


    } catch (error) {
        console.log("tertherj")
        console.log(error)
        console.log("tertherj")
        console.log("tertherj")
        // throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not coming from api gateway')

    }

    next()
}


