import { FollowModel } from "@follow/models/follow.schema";
import { IFollowDocument } from "@liben_hailu/sm-shared";

const createFollow = async (followData: IFollowDocument): Promise<IFollowDocument> => {
    const createdFollow: IFollowDocument = await FollowModel.create(followData) as IFollowDocument;
    return createdFollow;
};


const getFollow = async (followerId: string,followeeId: string): Promise<IFollowDocument | null> => {
    const follow: IFollowDocument | null = await FollowModel.findOne({ followerId, followeeId }).exec() as IFollowDocument;
    return follow;
};

export {
    createFollow,
    getFollow
}