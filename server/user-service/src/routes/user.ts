import express, { Router } from 'express';
import { id, random, username } from '../controllers/user/get';
import { user as createUser } from '../controllers/user/create';
import { user as updateUser } from '../controllers/user/update';

const router: Router = express.Router();

const userRoutes = (): Router => {
  router.get('/id/:userId', id);
  router.get('/username/:username', username);
  router.get('/random/:size', random);
  router.post('/create', createUser);
  router.put('/:userId', updateUser);

  return router;
};

export { userRoutes };
