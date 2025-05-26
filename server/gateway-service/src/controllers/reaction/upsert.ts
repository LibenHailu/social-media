import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { reactionService } from '../../services/api/reaction.service';

export class Upsert {
    public async upsert(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await reactionService.upsert(req.body);
        res
            .status(StatusCodes.OK)
            .json({ message: response.data.message, reactionData: response.data.reactionData });
    }
}