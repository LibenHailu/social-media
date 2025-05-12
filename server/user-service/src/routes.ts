import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { userRoutes } from './routes/user';
import { verifyGatewayRequest } from '@liben_hailu/sm-shared';

const BASE_PATH = '/api/v1/user';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, userRoutes());
};

export { appRoutes };
