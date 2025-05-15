import express, { Router } from 'express';
import { post as createPost } from '../controllers/create';
import { id, username } from '../controllers/get';

const router: Router = express.Router();

const postRoutes = (): Router => {
  router.get('/id/:postId', id);
  router.get('/username/:username', username);
  router.post('/create', createPost);

  return router;
};

export { postRoutes };
