import requests from 'src/services/httpService';
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('/client');
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/client/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/client', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/client/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/client/${id}`);
  },
};

export default Services;
