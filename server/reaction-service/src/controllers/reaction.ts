import { BadRequestError, IReactionDocument } from "@liben_hailu/sm-shared";
import { reactionSchema } from "@reaction/schemes/reaction";
import { upsertReaction } from "@reaction/services/reaction.service";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const upsert = async (req: Request, res: Response): Promise<void> => {
    const { error } = await Promise.resolve(reactionSchema.validate(req.body));
    if (error?.details) {
        throw new BadRequestError(error.details[0].message, 'Reaction upsert() method error');
    }

    const reaction: IReactionDocument = {
        postId: req.body.postId,
        username: req.body.username,
        reaction: req.body.reaction
    };

    const createdReaction: IReactionDocument = await upsertReaction(reaction);
    res.status(StatusCodes.CREATED).json({ message: 'Reaction created successfully.', reaction: createdReaction });
};

export { upsert };
