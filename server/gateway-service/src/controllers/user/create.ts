import { AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { userService } from '../../services/api/user.service';

export class Create {
    public async user(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await userService.createUser(req.body);
        res.status(StatusCodes.CREATED).json({ message: response.data.message, user: response.data.user });
    }
}