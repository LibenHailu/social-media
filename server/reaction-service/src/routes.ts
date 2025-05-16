import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { verifyGatewayRequest } from '@liben_hailu/sm-shared';
import { reactionRoutes } from './routes/reaction';

const BASE_PATH = '/api/v1/reaction';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, reactionRoutes());
};

export { appRoutes };
