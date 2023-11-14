'use client'

import NormalButton from '@/_components/common/NormalButton'

export default function Login() {
  const onLoginhandler = () => {
    const code = new URL(window.location.href).searchParams.get('code')
    console.log(code)
  }
  return (
    <a href={process.env.KAKAO_AUTH_URL}>
      <NormalButton
        buttonText="카카오로 3초만에 로그인"
        buttonType="next"
        onClick={onLoginhandler}
      />
    </a>
  )
}
