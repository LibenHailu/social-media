import { IPostDocument } from '@liben_hailu/sm-shared';
import axios, { AxiosResponse } from 'axios';
import { config } from '../../config';
import { AxiosService } from '../../services/axios';

export let axiosPostInstance: ReturnType<typeof axios.create>;

class PostService {
  constructor() {
    const axiosService: AxiosService = new AxiosService(`${config.POST_BASE_URL}/api/v1/post`, 'post');
    axiosPostInstance = axiosService.axios;
  }

  async getPost(postId: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosPostInstance.get(`/id/${postId}`);
    return response;
  }

  async getUserPosts(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosPostInstance.get(`/username/${username}`);
    return response;
  }

  async createPost(body: IPostDocument): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosPostInstance.post('/create', body);
    return response;
  }
}

export const postService: PostService = new PostService();