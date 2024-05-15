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
    if (error.response.status == 500) {
      try {
        Cookies.remove('refreshToken', { domain: 'test.moodmate.site' })
        const refresh = Cookies.get('refreshToken')
        console.log(refresh)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}users/refresh`,
          {
            refreshToken: refresh,
          },
        )

        const { accessToken, refreshToken } = response.data.tokenResponse
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.set('accessToken', accessToken)

        Cookies.set('refreshToken', refreshToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
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
