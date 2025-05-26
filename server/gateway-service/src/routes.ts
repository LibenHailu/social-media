import { Application } from 'express';

import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth';
import { authMiddleware } from './services/auth-middleware';
import { currentUserRoutes } from './routes/current-user';
import { messageRoutes } from './routes/message';
import { followRoutes } from './routes/follow';
import { postRoutes } from './routes/post';
import { reactionRoutes } from './routes/reaction';
import { userRoutes } from '@routes/user';

const BASE_PATH = '/api/gateway/v1';

export const appRoutes = (app: Application) => {
    app.use('', healthRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());

    app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, messageRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, followRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, postRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, reactionRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());
};
