import { postService } from '@services/api/post.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class Get {
  
  public async post(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await postService.getPost(req.params.postId);
    res.status(StatusCodes.OK).json({ message: response.data.message, post: response.data.postData });
  }

  public async userPosts(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    const response: AxiosResponse = await postService.getUserPosts(username);
    res.status(StatusCodes.OK).json({ message: response.data.message, posts: response.data.posts });
  }
}