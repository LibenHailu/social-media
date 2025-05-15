import { ObjectId } from "mongoose";

export interface IPostDocument {
    _id?: string | ObjectId;
    username?: string;
    userId?: string;
    body?: string;
    url?: string;
    file?: string;
    fileType?: string;
    fileSize?: string;
    fileName?: string;
    likesCount?: number;
    dislikeCount?: number;
    createdAt?: Date | string;
}
