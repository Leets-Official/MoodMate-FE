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
    const cookies = document.cookie.split(';')
    cookies.forEach((cookie) => {
      const [name, value] = cookie.trim().split('=')
      if (name === 'accessToken') {
        const accessToken = value
        console.log('123213', accessToken)
      }
    })
    const accessToken = Cookies.get('accessToken')
    console.log('inter', accessToken)
    if (accessToken) {
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
        await axios.post(`${process.env.GOOGLE_LOGIN}/users/refresh`)
        console.log('성공')
      } catch (e) {
        console.log(e)
      }
    }
  },
)

export default api
