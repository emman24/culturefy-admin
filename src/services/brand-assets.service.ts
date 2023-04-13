import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const CertificateServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/assets`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/assets/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/assets', body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/assets/${id}`);
  },
  update(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/assets/${id}`,body);
  },
};

export default CertificateServices;
