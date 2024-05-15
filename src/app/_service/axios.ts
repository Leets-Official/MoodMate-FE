import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken')
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
  async (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 400 || error.response.status == 500) {
      try {
        const refresh = Cookies.get('refreshToken')
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}users/refresh`,
          refresh,
        )

        const accessToken = response.data.jwtToken.accessToken
        if (accessToken) {
          Cookies.remove('accessToken')
          Cookies.set('accessToken', accessToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return await axios(originalRequest)
      } catch (e) {
        throw e
      }
    } else {
      /* empty */
    }
    error.response
    return Promise.reject(error)
  },
)

export default api
