import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const CourseServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/course`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/course/${id}`);
  },
  createCourse(body: any): Promise<AxiosResponse> {
    return requests.post('/course', body);
  },
  deleteCourse(id: string): Promise<AxiosResponse> {
    return requests.delete(`/course/${id}`);
  },
  updateCourse(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/course/${id}`,body);
  },
  
};

export default CourseServices;
