import {IPostDocument} from "@liben_hailu/sm-shared"
import { Model, Schema, model } from 'mongoose';

const postSchema: Schema = new Schema(
  {
    username: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    body: { type: String, default: '' },
    file: { type: String, default: '' },
    fileType: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    fileName: { type: String, default: '' },
    likesCount: {type: Number, default: 0},
    dislikeCount: {type: Number, default: 0},
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

const PostModel: Model<IPostDocument> = model<IPostDocument>('Post', postSchema, 'Post');
export { PostModel };