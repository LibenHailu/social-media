import { Application } from 'express';

import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './services/auth-middleware';
import { currentUserRoutes } from './routes/current-user';

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
    app.use('', healthRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());

    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
};
