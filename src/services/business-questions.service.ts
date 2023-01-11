import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const BusinessQuestionsServices = {
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/business-questions/${id}`);
  },
  updateBusiness(id: string | string[], body:any): Promise<AxiosResponse> {
    return requests.patch(`/business-questions/${id}`,body);
  },
};

export default BusinessQuestionsServices;
