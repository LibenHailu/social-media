import { health } from '../controllers/health';
import express, { Router } from 'express';

const router: Router = express.Router();

const healthRoutes = (): Router => {
  router.get('/post-health', health);

  return router;
};

export { healthRoutes };