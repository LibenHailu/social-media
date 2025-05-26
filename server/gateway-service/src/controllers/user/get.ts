import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { userService } from '../../services/api/user.service';

export class Get {
    public async id(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserById(req.params.userId);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

    public async username(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.getUserByUsername(req.params.username);
        res.status(StatusCodes.OK).json({ message: response.data.message, user: response.data.user });
    }

}