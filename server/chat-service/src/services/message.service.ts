import { IConversationDocument, IMessageDocument } from '@liben_hailu/sm-shared';
import { ConversationModel } from '../models/conversation.schema';
import { MessageModel } from '../models/message.schema';
import { socketIOChatObject } from '../server';

const createConversation = async (conversationId: string, sender: string, receiver: string): Promise<void> => {
  await ConversationModel.create({
    conversationId,
    senderUsername: sender,
    receiverUsername: receiver
  });
};

const addMessage = async (data: IMessageDocument): Promise<IMessageDocument> => {
  const message: IMessageDocument = await MessageModel.create(data) as IMessageDocument;
  socketIOChatObject.emit('message received', message);
  return message;
};

const getConversation = async (sender: string, receiver: string): Promise<IConversationDocument[]> => {
  const query = {
    $or: [
      { senderUsername: sender, receiverUsername: receiver },
      { senderUsername: receiver, receiverUsername: sender },
    ]
  };
  const conversation: IConversationDocument[] = await ConversationModel.aggregate([{ $match: query }]);
  return conversation;
};

const getUserConversationList = async (username: string): Promise<IMessageDocument[]> => {
  const query = {
    $or: [
      { senderUsername: username },
      { receiverUsername: username },
    ]
  };
  const messages: IMessageDocument[] = await MessageModel.aggregate([
    { $match: query },
    {
      $group: {
        _id: '$conversationId',
        result: { $top: { output: '$$ROOT', sortBy: { createdAt: -1 }}}
      }
    },
    {
      $project: {
        _id: '$result._id',
        conversationId: '$result.conversationId',
        senderId: '$result.senderId',
        receiverId: '$result.receiverId',
        receiverUsername: '$result.receiverUsername',
        receiverPicture: '$result.receiverPicture',
        senderUsername: '$result.senderUsername',
        senderPicture: '$result.senderPicture',
        body: '$result.body',
        file: '$result.file',
        isRead: '$result.isRead',
        createdAt: '$result.createdAt'
      }
    }
  ]);
  return messages;
};

const getMessages = async (sender: string, receiver: string): Promise<IMessageDocument[]> => {
  const query = {
    $or: [
      { senderUsername: sender, receiverUsername: receiver },
      { senderUsername: receiver, receiverUsername: sender },
    ]
  };
  const messages: IMessageDocument[] = await MessageModel.aggregate([
    { $match: query },
    { $sort: { createdAt: 1 }}
  ]);
  return messages;
};

const getUserMessages = async (messageConversationId: string): Promise<IMessageDocument[]> => {
  const messages: IMessageDocument[] = await MessageModel.aggregate([
    { $match: { conversationId: messageConversationId } },
    { $sort: { createdAt: 1 }}
  ]);
  return messages;
};

const updateMessage = async (messageId: string, body: string): Promise<IMessageDocument> => {
  const message: IMessageDocument = await MessageModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        body: body
      }
    },
    { new: true }
  ) as IMessageDocument;
  return message;
};

const markMessageAsRead = async (messageId: string): Promise<IMessageDocument> => {
  const message: IMessageDocument = await MessageModel.findOneAndUpdate(
    { _id: messageId },
    {
      $set: {
        isRead: true
      }
    },
    { new: true }
  ) as IMessageDocument;
  socketIOChatObject.emit('message updated', message);
  return message;
};

const markManyMessagesAsRead = async (receiver: string, sender: string, messageId: string): Promise<IMessageDocument> => {
  await MessageModel.updateMany(
    { senderUsername: sender, receiverUsername: receiver, isRead: false },
    {
      $set: {
        isRead: true
      }
    },
  ) as IMessageDocument;
  const message: IMessageDocument = await MessageModel.findOne({ _id: messageId }).exec() as IMessageDocument;
  socketIOChatObject.emit('message updated', message);
  return message;
};

export {
    addMessage, createConversation, getConversation, getMessages, getUserConversationList, getUserMessages, markManyMessagesAsRead, markMessageAsRead, updateMessage
};
