import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { postService } from '../../services/api/post.service';

export class Create {
  public async post(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await postService.createPost(req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, postData: response.data.postData });
  }
}