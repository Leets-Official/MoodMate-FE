import axios, { InternalAxiosRequestConfig } from 'axios'
import { parseCookies } from 'nookies'

const getAccessToken = () => {
  const cookies = parseCookies()
  return cookies.access_token
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // server url 변경!
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {},
)

api.interceptors.response.use()

export default api
