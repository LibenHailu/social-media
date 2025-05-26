import { IReactionDocument } from '@liben_hailu/sm-shared';
import axios, { AxiosResponse } from 'axios';
import { config } from '../../config';
import { AxiosService } from '../../services/axios';

export let axiosReactionInstance: ReturnType<typeof axios.create>;

class ReactionService {
    constructor() {
        const axiosService: AxiosService = new AxiosService(`${config.REACTION_BASE_URL}/api/v1/reaction`, 'reaction');
        axiosReactionInstance = axiosService.axios;
    }

    async upsert(body: IReactionDocument): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosReactionInstance.post('/upsert', body);
        return response;
    }
}

export const reactionService: ReactionService = new ReactionService();