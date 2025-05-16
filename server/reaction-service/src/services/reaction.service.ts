import { publishDirectMessage } from "@reaction/queues/user.producer";
import { ReactionModel } from "../models/reaction.schema";
import { IReactionDocument } from "@liben_hailu/sm-shared";
import { reactionChannel } from "../server";

const upsertReaction = async (reactionData: IReactionDocument): Promise<IReactionDocument> => {
    const createdReaction: IReactionDocument = await ReactionModel.findOneAndUpdate(
        { postId: reactionData.postId, username: reactionData.username },
        {
            $set: {
                reaction: reactionData.reaction,
                updated_at: new Date()
            },
            $setOnInsert: {
                created_at: new Date()
            }
        },
        { upsert: true, new: true }) as IReactionDocument;

    const counts = await ReactionModel.aggregate([
        { $match: { postId: reactionData.postId } },
        {
            $group: {
                _id: '$reaction',
                count: { $sum: 1 }
            }
        }
    ]);

    const reactionCounts = { like: 0, dislike: 0 };
    counts.forEach(item => {
        if (item._id === 'like') reactionCounts.like = item.count;
        else if (item._id === 'dislike') reactionCounts.dislike = item.count;
    });

    const likeMessageDetails = {
        postId: reactionData.postId!,
        count: reactionCounts.like!,
        type: 'update-like-count'
    };

    await publishDirectMessage(
        reactionChannel,
        'sm-post-update',
        'update-post',
        JSON.stringify(likeMessageDetails),
        'Reactions details sent to user service.'
    );

        const dislikeMessageDetails = {
        postId: reactionData.postId!,
        count: reactionCounts.like!,
        type: 'update-dislike-count'
    };
    
    await publishDirectMessage(
        reactionChannel,
        'sm-post-update',
        'update-post',
        JSON.stringify(dislikeMessageDetails),
        'Reactions details sent to user service.'
    );
    return createdReaction;
};

export {
    upsertReaction
}