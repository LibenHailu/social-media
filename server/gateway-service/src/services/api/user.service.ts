import { config } from '../../config';
import { IUserDocument } from '@liben_hailu/sm-shared';
import { AxiosService } from '../axios';
import axios, { AxiosResponse } from 'axios';

export let axiosUserInstance: ReturnType<typeof axios.create>;

class UserService {
    constructor() {
        const axiosService: AxiosService = new AxiosService(`${config.USERS_BASE_URL}/api/v1/user`, 'user');
        axiosUserInstance = axiosService.axios;
    }

    async getUserById(userId: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get(`/id/${userId}`);
        return response;
    }

    async getUserByUsername(username: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get(`/username/${username}`);
        return response;
    }

    async createUser(body: IUserDocument): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.post('/create', body);
        return response;
    }

    async updateUser(userId: string, body: IUserDocument): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.put(`/${userId}`, body);
        return response;
    }
}

export const userService: UserService = new UserService();