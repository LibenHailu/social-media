import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { followRoutes } from './routes/follow';
import { verifyGatewayRequest } from '@liben_hailu/sm-shared';

const BASE_PATH = '/api/v1/follow';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, followRoutes());
};

export { appRoutes };
