import express, { Router } from 'express';
import { upsert } from '../controllers/reaction';

const router: Router = express.Router();

const reactionRoutes = (): Router => {
  router.post('/upsert', upsert);
  return router;
};

export { reactionRoutes };
