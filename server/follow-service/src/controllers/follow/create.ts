import { createFollow, getFollow } from '@follow/services/follow.services';
import { BadRequestError, IFollowDocument } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { followSchema } from '../../schemes/follow';

const follow = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(followSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create follow() method error');
  }
  const checkIfFollowExist: IFollowDocument | null = await getFollow(req.body.follwerId, req.body.follweeId);
  if (checkIfFollowExist) {
    throw new BadRequestError('Follow already exist.', 'Create follow() method error');
  }
  const follow: IFollowDocument = {
    followerId: req.body.followerId,
    followeeId: req.body.followeeId,
  };
  const createdFollow: IFollowDocument = await createFollow(follow);
  res.status(StatusCodes.CREATED).json({ message: 'Follow created successfully.', follow: createdFollow });
};

export { follow };
