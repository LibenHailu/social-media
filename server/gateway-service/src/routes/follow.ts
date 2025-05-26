import express, { Router } from 'express';
import { Create } from '../controllers/follow/create';

class FollowRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/follow', Create.prototype.follow);
    return this.router;
  }
}

export const followRoutes: FollowRoutes = new FollowRoutes();