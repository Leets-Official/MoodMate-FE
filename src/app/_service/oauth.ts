import { setCookie } from 'nookies'
import api from './axios'

export const getUserToken = async (code: string) => {
  try {
    const response = await api
      .get('/users/login', {
        params: {
          kakaoAccessToken: code.toString(),
        },
      })
      .then((res) => res.data)
    const { accessToken } = response
    const { refreshToken } = response
    setCookie(null, 'accessToken', accessToken, {
      maxAge: 3 * 24 * 60 * 60,
      path: '/',
    })
    setCookie(null, 'refreshToken', refreshToken, {
      maxAge: 3 * 24 * 60 * 60,
      path: '/',
    })
  } catch (error) {
    throw error
  }
}
