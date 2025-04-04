import express, { Express } from 'express';
import { Logger, winstonLogger } from '@liben_hailu/sm-shared';

import { config } from './config';
import { start } from './server';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationApp', 'debug');

function initialize(): void {
    const app: Express = express();
    start(app);
    log.info('Notification Service Initialized.');
}

initialize();
