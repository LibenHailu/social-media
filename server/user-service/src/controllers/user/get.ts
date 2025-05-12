import { IUserDocument } from '@liben_hailu/sm-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getRandomUsers, getUserById, getUserByUsername } from '../../services/user.services';

const id = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserById(req.params.userId);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const username = async (req: Request, res: Response): Promise<void> => {
  const user: IUserDocument | null = await getUserByUsername(req.params.username);
  res.status(StatusCodes.OK).json({ message: 'User profile', user });
};

const random = async (req: Request, res: Response): Promise<void> => {
  const users: IUserDocument[] = await getRandomUsers(parseInt(req.params.size, 10));
  res.status(StatusCodes.OK).json({ message: 'Random users profile', users });
};

export { id, random, username };
