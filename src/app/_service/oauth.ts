import { setCookie } from 'nookies'
import api from './axios'

const getUserToken = async () => {
  try {
    const response = await api.get('/users/login').then((res) => res.data)
    const access_token = response.access_token
    const refresh_token = response.refresh_token
    setCookie(null, 'access_token', 'access', {
      maxAge: 3 * 60 * 60,
      path: '/',
    })
    setCookie(null, 'refresh_token', 'refresh', {
      maxAge: 3 * 24 * 60 * 60,
      path: '/',
    })
  } catch (e: any) {
    console.log('유저 토큰 가져오기 에러 : ', e.message)
    throw e
  }
}
