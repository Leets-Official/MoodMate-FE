import { loginApi } from '@/_service/axios'

/** 소설로그인 */
export const socialLogin = async () => {
  try {
    return await loginApi.get('oauth/callback/google').then((res) => res.data)
  } catch (error) {
    console.log('로그인 실패 : ', error)
    throw error
  }
}
