import requests from 'src/services/httpService';
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('/assignment-type');
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/assignment-type/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/assignment-type', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/assignment-type/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/assignment-type/${id}`);
  },
};

export default Services;
