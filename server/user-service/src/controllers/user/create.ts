import { BadRequestError, IUserDocument } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userSchema } from '../../schemes/user';
import { createUser, getUserByEmail } from '../../services/user.services';

const user = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(userSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'Create user() method error');
  }
  const checkIfUserExist: IUserDocument | null = await getUserByEmail(req.body.email);
  if (checkIfUserExist) {
    throw new BadRequestError('User already exist. Go to your account page to update.', 'Create user() method error');
  }
  const user: IUserDocument = {
    profilePublicId: req.body.profilePublicId,
    fullName: req.body.fullName,
    username: req.currentUser!.username,
    email: req.body.email,
    profilePicture: req.body.profilePicture,
    description: req.body.description,
    country: req.body.country,

  };
  const createdUser: IUserDocument = await createUser(user);
  res.status(StatusCodes.CREATED).json({ message: 'User created successfully.', user: createdUser });
};

export { user };
