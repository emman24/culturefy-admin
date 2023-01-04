import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';

const BusinessServices = {
  getAll(): Promise<AxiosResponse> {
    return requests.get(`/business`);
  },
};

export default BusinessServices;
