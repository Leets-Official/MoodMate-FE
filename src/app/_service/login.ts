import api from '@/_service/axios'
import Cookies from 'js-cookie'

/** 소설로그인 */
export const socialLogin = async () => {
  try {
    const res = await api.get('oauth/callback/google')
    console.log(res.headers)

    // 쿠키 저장
    // Cookies.set('accessToken', accessToken)
    // Cookies.set('refreshToken', refreshToken)
  } catch (error) {
    console.log('로그인 실패 : ', error)
    throw error
  }
}
