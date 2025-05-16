import { health } from '../controllers/health';
import express, { Router } from 'express';

const router: Router = express.Router();

const healthRoutes = (): Router => {
  router.get('/reaction-health', health);

  return router;
};

export { healthRoutes };