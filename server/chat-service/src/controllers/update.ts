import { markManyMessagesAsRead, markMessageAsRead, updateMessage } from '../services/message.service';
import { IMessageDocument } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const update = async (req: Request, res: Response): Promise<void> => {
  const { messageId, body } = req.body;
  const message: IMessageDocument = await updateMessage(messageId, body);
  res.status(StatusCodes.OK).json({ message: 'Message updated', singleMessage: message });
};

const markMultipleMessages = async (req: Request, res: Response): Promise<void> => {
  const { messageId, senderUsername, receiverUsername } = req.body;
  await markManyMessagesAsRead(receiverUsername, senderUsername, messageId);
  res.status(StatusCodes.OK).json({ message: 'Messages marked as read' });
};

const markSingleMessage = async (req: Request, res: Response): Promise<void> => {
  const { messageId } = req.body;
  const message: IMessageDocument = await markMessageAsRead(messageId);
  res.status(StatusCodes.OK).json({ message: 'Message marked as read', singleMessage: message });
};

export { update, markMultipleMessages, markSingleMessage };