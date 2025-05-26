import { Upsert } from '@controllers/reaction/upsert';
import express, { Router } from 'express';

class ReactionRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/upsert', Upsert.prototype.upsert);
        return this.router;
    }
}

export const reactionRoutes: ReactionRoutes = new ReactionRoutes();