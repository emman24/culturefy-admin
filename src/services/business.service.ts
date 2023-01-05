import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const BusinessServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/business`);
  },
  createBusiness(body: any): Promise<AxiosResponse> {
    return requests.post('/business', body);
  },
};

export default BusinessServices;
