import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const WorkGoalsServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/workgoal`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/workgoal/${id}`);
  },
  addWorkGoal(body: any): Promise<AxiosResponse> {
    return requests.post('/workgoal', body);
  },
  deleteWorkGoal(id: string): Promise<AxiosResponse> {
    return requests.delete(`/workgoal/${id}`);
  },
  updateWorkGoal(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/workgoal/${id}`,body);
  },
  
};

export default WorkGoalsServices;
