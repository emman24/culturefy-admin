import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const CertificateServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/certificate`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/certificate/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/certificate', body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/certificate/${id}`);
  },
  update(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/certificate/${id}`,body);
  },
  
  // CERTiFICATE TESTS
  getTestById(id: string): Promise<AxiosResponse> {
    return requests.get(`/certificate/test/${id}`);
  },
  updateTestById(id: string,  body:any): Promise<AxiosResponse> {
    return requests.put(`/certificate/test/${id}`,body);
  },
};

export default CertificateServices;
