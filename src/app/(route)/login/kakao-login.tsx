import { useEffect } from 'react'

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code')
  useEffect(() => {
    const postCode = async () => {
      try {
        console.log(code)
        // const response = await apiInstance.post('/auth/kakao', null, { params: { authorizationCode: KAKAO_CODE } })
      } catch (e) {
        console.log(e)
      }
    }
    postCode()
  }, [])
}

export default KakaoLogin
