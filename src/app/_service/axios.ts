import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.GOOGLE_LOGIN, // server url 변경!
})

// export const loginApi = axios.create({
//   baseURL: process.env.GOOGLE_LOGIN,
// })

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('accessToken')
    console.log('access', token)

    // if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
    // }
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
    const refreshToken = Cookies.get('refreshToken')
    if (
      error.response.status === 401 &&
      originalRequest &&
      // eslint-disable-next-line no-underscore-dangle
      !error.config.__isRetryRequest &&
      refreshToken
    ) {
      try {
        // const newAccessToken = await axios.post(
        //   `${process.env.GOOGLE_LOGIN}/users/refresh`,
        //   {
        //     refreshToken,
        //   },
        // )
        // setCookie(null, 'accessToken', newAccessToken.data.accessToken, {
        //   // maxAge: 3 * 60 * 60,
        //   path: '/',
        // })
      } catch (e) {
        /* empty */
      }
    }
  },
)

export default api
