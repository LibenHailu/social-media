
import { Create } from '../controllers/user/create';
import { Get } from '../controllers/user/get';
import { authMiddleware } from '../services/auth-middleware';
import express, { Router } from 'express';
import { Update } from '../controllers/user/update';

class UserRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.get('/user/id/:userId', authMiddleware.checkAuthentication, Get.prototype.id);
        this.router.get('/user/username/:username', authMiddleware.checkAuthentication, Get.prototype.username);
        this.router.post('/user/create', authMiddleware.checkAuthentication, Create.prototype.user);
        this.router.put('/user/:userId', authMiddleware.checkAuthentication, Update.prototype.user);

        return this.router;
    }
}

export const userRoutes: UserRoutes = new UserRoutes();