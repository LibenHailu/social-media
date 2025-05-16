import { ObjectId } from "mongoose";

type Reaction = 'like' | 'dislike';

export interface IReactionDocument {
    _id?: string | ObjectId;
    postId?: string;
    username?: string;
    reaction?: Reaction;
}
