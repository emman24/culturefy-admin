import requests from './httpService';
import { AxiosResponse } from 'axios'

const S3Services = {
  upload(body: any): Promise<AxiosResponse> {
    return requests.post('/file/uploadS3', body);
  }
};

export default S3Services;