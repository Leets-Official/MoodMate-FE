import axios, { InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

export const loginApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
})

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken')
    console.log(accessToken)
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

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     const refreshToken = Cookies.get('refreshToken')
//     if (
//       error.response.status === 401 &&
//       originalRequest &&
//       !error.config.__isRetryRequest &&
//       refreshToken
//     ) {
//       try {
//         // const newAccessToken = await axios.post(
//         //   `${process.env.NEXT_PUBLIC_SERVER_URL}/users/refresh`,
//         //   {
//         //     refreshToken,
//         //   },
//         // )
//         // setCookie(null, 'accessToken', newAccessToken.data.accessToken, {
//         //   maxAge: 3 * 60 * 60,
//         //   path: '/',
//         // })
//       } catch (e) {}
//     }
//   },
// )

export default api
