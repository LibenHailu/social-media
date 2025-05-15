import { IMessageDocument } from '@liben_hailu/sm-shared';
import { Model, Schema, model } from 'mongoose';

const messageSchema: Schema = new Schema(
  {
    conversationId: { type: String, required: true, index: true },
    senderUsername: { type: String, required: true, index: true },
    receiverUsername: { type: String, required: true, index: true },
    senderPicture: { type: String, required: true },
    receiverPicture: { type: String, required: true },
    body: { type: String, default: '' },
    file: { type: String, default: '' },
    fileType: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    fileName: { type: String, default: '' },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

const MessageModel: Model<IMessageDocument> = model<IMessageDocument>('Message', messageSchema, 'Message');
export { MessageModel };