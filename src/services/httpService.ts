import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const instance = axios.create({
  // baseURL: "http://192.168.0.44:5000/api/v1", // local
<<<<<<< HEAD
  baseURL: 'http://localhost:5000/api/v1', // local,
  // baseURL: "https://api.culturefy.app/api/v1",
=======
  // baseURL: 'http://localhost:5000/api/v1', // local,
  baseURL: "https://api.culturefy.app/api/v1",
>>>>>>> ef9e10d4a03e1c956ec452b1cb458505e6bbf8d3
  
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  return {
    ...config,
    headers: {
      authorization: storedToken ? `Bearer ${storedToken}` : null
    }
  }
})

// const responseBody = (response: any) => response.data;

// const requests = {
//   get: (url: any, body?: any, headers?: any) => instance.get(url, body).then(responseBody),

//   post: (url: string, body: any) => instance.post(url, body).then(responseBody),

//   put: (url: any, body: any, headers: any) => instance.put(url, body).then(responseBody),

//   patch: (url: any, body: any) => instance.patch(url, body).then(responseBody),

//   delete: (url: any) => instance.delete(url).then(responseBody),
// };

export default instance
