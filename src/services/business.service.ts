import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const BusinessServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/business`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/business/${id}`);
  },
  createBusiness(body: any): Promise<AxiosResponse> {
    return requests.post('/business', body);
  },
  updateBusiness(id: string, body:any): Promise<AxiosResponse> {
    return requests.patch(`/business/${id}`,body);
  },
};

export default BusinessServices;
