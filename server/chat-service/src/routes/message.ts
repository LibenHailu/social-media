import { message } from '@chat/controllers/create';
import { conversation, conversationList, messages, userMessages } from '../controllers/get';
import { markMultipleMessages, markSingleMessage, update } from '../controllers/update';
import express, { Router } from 'express';

const router: Router = express.Router();

const messageRoutes = (): Router => {
  router.get('/conversation/:senderUsername/:receiverUsername', conversation);
  router.get('/conversations/:username', conversationList);
  router.get('/:senderUsername/:receiverUsername', messages);
  router.get('/:conversationId', userMessages);
  router.post('/', message);
  router.put('/offer', update);
  router.put('/mark-as-read', markSingleMessage);
  router.put('/mark-multiple-as-read', markMultipleMessages);

  return router;
};

export { messageRoutes };