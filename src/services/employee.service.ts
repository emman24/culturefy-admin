import requests from 'src/services/httpService';
import { AxiosResponse } from 'axios'

const Services = {
  getAll(): Promise<AxiosResponse> {
    return requests.get('/auth/employee');
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/auth/employee/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/auth/employee', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/auth/employee/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/auth/employee/${id}`);
  },
};

export default Services;
