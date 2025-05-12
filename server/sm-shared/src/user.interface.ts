import { ObjectId } from "mongoose";

export interface IUserDocument {
    _id?: string | ObjectId;
    profilePublicId?: string;
    fullName: string;
    username?: string;
    email?: string;
    profilePicture?: string;
    description: string;
    country: string;
    followers?: number;
    following?: number;
    createdAt?: Date | string;
}