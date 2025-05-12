import { IUserDocument } from '@liben_hailu/sm-shared';
import mongoose from 'mongoose';
import { UserModel } from '../models/user.schema';

const getUserById = async (userId: string): Promise<IUserDocument | null> => {
    const user: IUserDocument | null = await UserModel.findOne({ _id: new mongoose.Types.ObjectId(userId) }).exec() as IUserDocument;
    return user;
};

const getUserByUsername = async (username: string): Promise<IUserDocument | null> => {
    const user: IUserDocument | null = await UserModel.findOne({ username }).exec() as IUserDocument;
    return user;
};

const getUserByEmail = async (email: string): Promise<IUserDocument | null> => {
    const user: IUserDocument | null = await UserModel.findOne({ email }).exec() as IUserDocument;
    return user;
};

const getRandomUsers = async (size: number): Promise<IUserDocument[]> => {
    const users: IUserDocument[] = await UserModel.aggregate([{ $sample: { size } }]);
    return users;
};

const createUser = async (userData: IUserDocument): Promise<IUserDocument> => {
    const createdUser: IUserDocument = await UserModel.create(userData) as IUserDocument;
    return createdUser;
};

const updateUser = async (userId: string, userData: IUserDocument): Promise<IUserDocument> => {
    const updatedUser: IUserDocument = await UserModel.findOneAndUpdate(
        { _id: userId },
        {
            $set: {
                profilePublicId: userData.profilePublicId,
                fullName: userData.fullName,
                profilePicture: userData.profilePicture,
                description: userData.description,
                country: userData.country,
                followers: userData.followers,
                following: userData.following
            }
        },
        { new: true }
    ).exec() as IUserDocument;
    return updatedUser;
};

const updateTotalFollowersCount = async (userId: string, count: number): Promise<void> => {
    await UserModel.updateOne({ _id: userId }, { $inc: { followers: count } }).exec();
};

const updateTotalFollowingCount = async (userId: string, count: number): Promise<void> => {
    await UserModel.updateOne({ _id: userId }, { $inc: { following: count } }).exec();
};

export {
    createUser, updateUser, getRandomUsers, getUserByEmail, getUserById, getUserByUsername, updateTotalFollowersCount, updateTotalFollowingCount
};
