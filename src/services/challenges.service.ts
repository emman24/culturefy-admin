import http from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAllChallenges(data: any): Promise<AxiosResponse> {
    return http.get(`/invoice`)
  },
  getChallengesById(data: any): Promise<AxiosResponse> {
    return http.get(`/invoice`)
  },
  addChallenges(body: any): Promise<AxiosResponse> {
    return http.post(`/invoice`)
  },
  updateChallenges(body: any, id: any): Promise<AxiosResponse> {
    return http.post(`/invoice`)
  },
  deleteChallenges(body: any): Promise<AxiosResponse> {
    return http.post(`/invoice`)
  }
}

export default Services
