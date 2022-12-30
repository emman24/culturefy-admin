import requests from 'src/services/httpService';
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
    getAll({ query }: GetParams): Promise<AxiosResponse> {
        return requests.get(`/subscriptions?${query}`);
    },
    getById(id: string): Promise<AxiosResponse> {
        return requests.get(`/subscriptions/${id}`);
    },
    add(body: any): Promise<AxiosResponse> {
        return requests.post('/subscriptions', body);
    },
    update(id: string, body: any): Promise<AxiosResponse> {
        return requests.put(`/subscriptions/${id}`, body);
    },
    delete(id: string): Promise<AxiosResponse> {
        return requests.delete(`/subscriptions/${id}`);
    },
};

export default Services;
