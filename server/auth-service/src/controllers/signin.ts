import { BadRequestError, IAuthDocument, isEmail } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { loginSchema } from '../schemas/signin';
import { getUserByEmail, getUserByUsername, signToken } from '../services/auth.service';
import { AuthModel } from '../models/auth.schema';
import { omit } from 'lodash';
import { StatusCodes } from 'http-status-codes';
export async function read(req: Request, res: Response): Promise<void> {
  const { error } = await Promise.resolve(loginSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(error.details[0].message, 'SignUp create() method error');
  }
  const { username, password } = req.body;
  const isValidEmail: boolean = isEmail(username);
  const existingUser: IAuthDocument = (!isValidEmail ? await getUserByUsername(username) : await getUserByEmail(username)) as IAuthDocument;
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
  }
  const passwordsMatch: boolean = await AuthModel.prototype.comparePassword(password, existingUser.password!);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
  }
  const userJWT: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!);
  const userData: IAuthDocument = omit(existingUser, ['password']);
  res.send(StatusCodes.OK).json({ message: 'User login successfully', user: userData, token: userJWT });
}
