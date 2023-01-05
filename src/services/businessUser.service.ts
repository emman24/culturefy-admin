import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const BusinessUserServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/business`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/business/${id}`);
  },
  createBusinessUser(body: any): Promise<AxiosResponse> {
    return requests.post('/create-business-user', body);
  },
  deleteBusinessUser(id: string): Promise<AxiosResponse> {
    return requests.delete(`/business/${id}`);
  },
  updateBusinessUser(id: string, body:any): Promise<AxiosResponse> {
    return requests.patch(`/business/${id}`,body);
  },
  
};

export default BusinessUserServices;
