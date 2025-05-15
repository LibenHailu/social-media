import { IPostDocument } from '@liben_hailu/sm-shared';
import { getPostById, getPostsByUsername } from '../services/post.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const id = async (req: Request, res: Response): Promise<void> => {
  const post: IPostDocument | null = await getPostById(req.params.postId);
  res.status(StatusCodes.OK).json({ message: 'Single Post', post });
};

const username = async (req: Request, res: Response): Promise<void> => {
  const posts: IPostDocument[] | null = await getPostsByUsername(req.params.username);
  res.status(StatusCodes.OK).json({ message: 'User Posts', posts });
};

export { id, username };
