import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'

const getAccessToken = () => {
  const cookies = parseCookies()
  return cookies.accessToken
}

const getRefreshToken = () => {
  const cookies = parseCookies()
  return cookies.refreshToken
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // server url 변경!
})

export const loginApi = axios.create({
  baseURL: process.env.GOOGLE_LOGIN,
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = getAccessToken()
    // if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjIsImVtYWlsIjoibW9vZG1hdGUyMDIzQGdtYWlsLmNvbSIsInN1YiI6IjIiLCJleHAiOjE3MDE3NjAwMDJ9.tcAN6SfjU5akWC56FSNvjs_TD-EmJ-LwkYhDSSiyPyc`
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
    const refreshToken = getRefreshToken()
    if (
      error.response.status === 401 &&
      originalRequest &&
      !error.config.__isRetryRequest &&
      refreshToken
    ) {
      try {
        const newAccessToken = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/refresh`,
          {
            refreshToken,
          },
        )
        setCookie(null, 'accessToken', newAccessToken.data.accessToken, {
          maxAge: 3 * 60 * 60,
          path: '/',
        })
      } catch (e) {}
    }
  },
)

export default api