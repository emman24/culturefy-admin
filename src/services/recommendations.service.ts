import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const RecommendationsServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/recommendation`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/recommendation/${id}`);
  },
  createRecommendations(body: any): Promise<AxiosResponse> {
    return requests.post('/recommendation', body);
  },
  deleteRecommendations(id: string): Promise<AxiosResponse> {
    return requests.delete(`/recommendation/${id}`);
  },
  updateRecommendations(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/recommendation/${id}`,body);
  },
  
};

export default RecommendationsServices;
