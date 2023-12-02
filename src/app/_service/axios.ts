import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies, setCookie } from 'nookies'

const getAccessToken = () => {
  const cookies = parseCookies()
  return cookies.access_token
}

const getRefreshToken = () => {
  const cookies = parseCookies()
  return cookies.refresh_token
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // server url 변경!
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = getAccessToken()
    //
    // if (token) {
    //   // eslint-disable-next-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjMsImVtYWlsIjoiYWhjaGphbmdAbmF2ZXIuY29tIiwic3ViIjoiMyIsImV4cCI6MTcwMTQ5ODM5NH0.n-n5T3nHspoj3TPuhpc6clHBFdSMbv81xzXt-VKZQEA`
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
            refreshToken: refreshToken,
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
