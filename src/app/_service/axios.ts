import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.GOOGLE_LOGIN,
  withCredentials: true,
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('realAccessToken')
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 400) {
      try {
        await axios.post(`${process.env.GOOGLE_LOGIN}users/refresh`)
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log(error.response.status)
    }
  },
)

export default api
