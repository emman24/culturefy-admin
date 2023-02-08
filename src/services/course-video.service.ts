import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const CourseVideoServices = {
  // getById(id: string): Promise<AxiosResponse> {
  //   return requests.get(`/coursevideo/${id}`);
  // },
  createCourseVideo(body: any): Promise<AxiosResponse> {
    return requests.post('/coursevideo', body);
  },
  deleteCourseVideo(id: string): Promise<AxiosResponse> {
    return requests.delete(`/coursevideo/${id}`);
  },
  updateCourseVideo(id: string, body:any): Promise<AxiosResponse> {
    return requests.put(`/coursevideo/${id}`,body);
  },
  
};

export default CourseVideoServices;
