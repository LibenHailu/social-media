import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '../../services/axios';
import { config } from '../../config';
import { IFollowDocument } from '@liben_hailu/sm-shared';

export let axiosFollowInstance: ReturnType<typeof axios.create>;

class FollowService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.Follow_BASE_URL}/api/v1/follow`, 'follow');
    axiosFollowInstance = axiosService.axios;
  }

  async createFollow(body: IFollowDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosFollowInstance.post('/create', body);
    return response;
  }
}

export const followService: FollowService = new FollowService();