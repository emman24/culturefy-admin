import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const PositionGoalsServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/postiongoal`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/postiongoal/${id}`);
  },
  addPositionGoal(body: any): Promise<AxiosResponse> {
    return requests.post('/postiongoal', body);
  },
  deletePositionGoal(id: string): Promise<AxiosResponse> {
    return requests.delete(`/postiongoal/${id}`);
  },
  updatePositionGoal(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/postiongoal/${id}`,body);
  },
  
};

export default PositionGoalsServices;
