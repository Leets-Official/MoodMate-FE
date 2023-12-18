import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.GOOGLE_LOGIN,
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
    if (error.response.status === 400) {
      try {
        const refresh = Cookies.get('refreshToken')
        const response = await axios.post(
          `${process.env.GOOGLE_LOGIN}users/refresh`,
          {
            refreshToken: refresh,
          },
        )

        const { accessToken, refreshToken } = response.data.tokenResponse
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')

        const accessTokenExpiry = new Date()
        accessTokenExpiry.setTime(
          accessTokenExpiry.getTime() + 3 * 60 * 60 * 1000,
        )
        Cookies.set('accessToken', accessToken, { expires: accessTokenExpiry })

        const refreshTokenExpiry = new Date()
        refreshTokenExpiry.setTime(
          refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
        )
        Cookies.set('refreshToken', refreshToken, {
          expires: refreshTokenExpiry,
        })

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return await axios(originalRequest)
      } catch (e) {
        throw e
      }
    } else {
      /* empty */
    }
    return Promise.reject(error)
  },
)

export default api
