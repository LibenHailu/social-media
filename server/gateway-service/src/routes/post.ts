import express, { Router } from 'express';
import { Create } from '../controllers/post/create';
import { Get } from '../controllers/post/get';

class PostRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/create', Create.prototype.post);
        this.router.get('/id/:postId', Get.prototype.post);
        this.router.get('/username/:username', Get.prototype.userPosts);
        return this.router;
    }
}

export const postRoutes: PostRoutes = new PostRoutes();