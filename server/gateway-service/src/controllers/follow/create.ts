import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { followService } from '../../services/api/follow.service';

export class Create {
  public async follow(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await followService.createFollow(req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, followData: response.data.followData });
  }
}