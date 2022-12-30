
import { AxiosResponse } from 'axios'
import requests from './httpService';

const AuthServices = {
  login(body: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`/auth/signin`, body);
  },
  signup(body: any): Promise<AxiosResponse<any, any>> {
    return requests.post(`/auth/signup`, body);
  },
  me(): Promise<AxiosResponse<any, any>> {
    return requests.get(`/auth/me`);
  }
};

export default AuthServices;
