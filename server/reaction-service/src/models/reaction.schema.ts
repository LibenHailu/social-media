import { IReactionDocument } from '@liben_hailu/sm-shared';
import { Model, Schema, model } from 'mongoose';

const reactionSchema: Schema = new Schema(
    {
        postId: { type: String, required: true, index: true },
        username: { type: String, required: true, index: true },
        reaction: { type: String, enum: ['like', 'dislike'], required: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const ReactionModel: Model<IReactionDocument> = model<IReactionDocument>('reaction', reactionSchema, 'Reaction');
export { ReactionModel };