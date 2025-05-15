import { IPostDocument } from "@liben_hailu/sm-shared";
import { PostModel } from "@post/models/post.schema";
import mongoose from "mongoose";

const createPost = async (postData: IPostDocument): Promise<IPostDocument> => {
    const createdPost: IPostDocument = await PostModel.create(postData) as IPostDocument;
    return createdPost;
};

const getPostById = async (postId: string): Promise<IPostDocument | null> => {
    const post: IPostDocument | null = await PostModel.findOne({ _id: new mongoose.Types.ObjectId(postId) }).exec() as IPostDocument;
    return post;
};

const getPostsByUsername = async (username: string): Promise<IPostDocument[] | null> => {
    const posts: IPostDocument[] | null = await PostModel.find({ username }).exec() as IPostDocument[];
    return posts;
};

const updateTotalLikeCount = async (postId: string, count: number): Promise<void> => {
    await PostModel.updateOne({ _id: postId }, { $inc: { likesCount: count } }).exec();
};

const updateTotalDislikeCount = async (postId: string, count: number): Promise<void> => {
    await PostModel.updateOne({ _id: postId }, { $inc: { dislikeCount: count } }).exec();
};


export { createPost, updateTotalDislikeCount, updateTotalLikeCount, getPostById, getPostsByUsername };
