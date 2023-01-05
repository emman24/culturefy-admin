import axios, { AxiosResponse } from 'axios'

const CloudinaryService = {
    upload(body: any): Promise<AxiosResponse> {
        return axios.post('https://api.cloudinary.com/v1_1/dw7nck3bs/auto/upload', body);
    },

};

export default CloudinaryService;
