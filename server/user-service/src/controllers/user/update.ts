import { BadRequestError, IUserDocument } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userSchema } from '../../schemes/user';
import { updateUser } from '../../services/user.services';

const user = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(userSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Update user() method error');
  }
  const user: IUserDocument = {
    profilePublicId: req.body.profilePublicId,
    fullName: req.body.fullName,
    profilePicture: req.body.profilePicture,
    description: req.body.description,
    country: req.body.country,
  };
  const updatedUser: IUserDocument = await updateUser(req.params.userId, user);
  res.status(StatusCodes.OK).json({ message: 'User created successfully.', user: updatedUser });
};

export { user };
