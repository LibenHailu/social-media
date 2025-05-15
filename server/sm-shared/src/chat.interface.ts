import mongoose, { ObjectId } from 'mongoose';

export interface IConversationDocument extends Document {
    _id: mongoose.Types.ObjectId | string;
    conversationId: string;
    senderUsername: string;
    receiverUsername: string;
}

export interface IMessageDocument {
    _id?: string | ObjectId;
    conversationId?: string;
    body?: string;
    url?: string;
    file?: string;
    fileType?: string;
    fileSize?: string;
    fileName?: string;
    senderId?: string;
    receiverId?: string;
    senderUsername?: string;
    senderPicture?: string;
    receiverUsername?: string;
    receiverPicture?: string;
    isRead?: boolean;
    hasConversationId?: boolean;
    createdAt?: Date | string;
}

