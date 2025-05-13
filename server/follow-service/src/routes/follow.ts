import express, { Router } from 'express';
import { follow } from '../controllers/follow/create';

const router: Router = express.Router();

const followRoutes = (): Router => {
  router.post('/create', follow);
  return router;
};

export { followRoutes };
