import api from '@/_service/axios'

/** 소설로그인 */
export const socialLogin = async () => {
  try {
    const {
      data: { accessToken, refreshToken },
    } = await api.get('oauth/callback/google')
    console.log(accessToken, refreshToken)

    // 쿠키 저장
  } catch (error) {
    console.log('로그인 실패 : ', error)
    throw error
  }
}
