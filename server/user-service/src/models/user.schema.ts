import { IUserDocument } from '@liben_hailu/sm-shared';
import { Model, Schema, model } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        username: { type: String, required: true, index: true },
        email: { type: String, required: true, index: true },
        profilePicture: { type: String, required: true },
        description: { type: String, required: false, default: "" },
        profilePublicId: { type: String, required: true },
        country: { type: String, required: true },
        followers: { type: Number, default: 0 },
        following: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);

const UserModel: Model<IUserDocument> = model<IUserDocument>('user', userSchema, 'User');
export { UserModel };