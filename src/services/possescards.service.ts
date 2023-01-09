import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const PossesCardsServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/possescards`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/possescards/${id}`);
  },
  createPossesCard(body: any): Promise<AxiosResponse> {
    return requests.post('/possescards', body);
  },
  deletePossesCard(id: string): Promise<AxiosResponse> {
    return requests.delete(`/possescards/${id}`);
  },
  updatePossesCard(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/possescards/${id}`,body);
  },
  
};

export default PossesCardsServices;
