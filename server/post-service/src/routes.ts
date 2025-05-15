import { verifyGatewayRequest } from '@liben_hailu/sm-shared';
import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { postRoutes } from './routes/post';

const BASE_PATH = '/api/v1/user';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, postRoutes());
};

export { appRoutes };
