import 'express-async-errors';
import http from 'http';

import { winstonLogger, Logger } from '@liben_hailu/sm-shared';
import { Application } from 'express';
import { Channel } from 'amqplib';

import { consumeAuthEmailMessages } from './queues/email.consumer';
import { config } from './config';
import { healthRoutes } from './routes';
import { createConnection } from './queues/connection';
import { checkConnection } from './elasticsearch';


const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationServer', 'debug');

export function start(app: Application): void {
  startServer(app);
  //   http://localhost:4001/notification-routes
  app.use('', healthRoutes());
  startQueues();
  startElasticSearch();
}

async function startQueues(): Promise<void> {
  const emailChannel: Channel = await createConnection() as Channel;
  await consumeAuthEmailMessages(emailChannel);
  await emailChannel.assertExchange('jobber-email-notification', 'direct');
  const message = JSON.stringify({ name: 'jobber', service: 'auth notification service' });
  emailChannel.publish('jobber-email-notification', 'auth-email', Buffer.from(message));
}

function startElasticSearch(): void {
  checkConnection();
}

function startServer(app: Application): void {
  try {
    const httpServer: http.Server = new http.Server(app);
    log.info(`Worker with process id of ${process.pid} on notification server has started`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log('error', 'NotificationService startServer() method:', error);
  }
}
