import requests from 'src/services/httpService';
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('/labels');
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/labels/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/labels', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/labels/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/labels/${id}`);
  },
};

export default Services;
