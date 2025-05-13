import { ObjectId } from "mongoose";

export interface IFollowDocument {
    _id?: string | ObjectId;
    followerId?: string;
    followeeId?: string;
    createdAt?: Date | string;
}