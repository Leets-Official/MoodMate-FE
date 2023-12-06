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
    // const token = getAccessToken()
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    console.log('access', accessToken)
    console.log('refresh', refreshToken)
    // console.log('docum', document.cookie)

    // if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjQsImVtYWlsIjoiZXVuenp6enp6MUBuYXZlci5jb20iLCJzdWIiOiI0IiwiZXhwIjoxNzAxODUyOTY1fQ.rbF2BOPnUgv7rlgL6W8aozFuPQKRrkdJc7-rerQhjBQ`
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
