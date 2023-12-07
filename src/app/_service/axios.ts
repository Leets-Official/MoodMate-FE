import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.GOOGLE_LOGIN,
  withCredentials: true,
})

// export const loginApi = axios.create({
//   baseURL: process.env.GOOGLE_LOGIN,
// })

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('realAccessToken')
    console.log('inter', accessToken)
    if (accessToken) {
      console.log('로그인 성공')
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    console.log(config.headers)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    console.log(response.headers)
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      originalRequest &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config.__isRetryRequest
    ) {
      try {
        await axios.post(`${process.env.GOOGLE_LOGIN}users/refresh`)
        console.log('성공')
      } catch (e) {
        console.log(e)
      }
    }
  },
)

export default api
