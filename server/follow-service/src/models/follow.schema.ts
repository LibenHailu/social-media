import { IFollowDocument } from '@liben_hailu/sm-shared';
import { Model, Schema, model } from 'mongoose';

const followSchema: Schema = new Schema(
    {
        followerId: { type: String, required: true, index: true },
        followeeId: { type: String, required: true, index: true },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const FollowModel: Model<IFollowDocument> = model<IFollowDocument>('follow', followSchema, 'Follow');
export { FollowModel };