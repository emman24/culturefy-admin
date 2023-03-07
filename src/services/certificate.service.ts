import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const CertificateServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/certficate`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/certficate/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/certficate', body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/certficate/${id}`);
  },
  update(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/certficate/${id}`,body);
  },
  
};

export default CertificateServices;
