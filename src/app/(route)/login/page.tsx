'use client'

import NormalButton from '@/_components/common/NormalButton'
import Link from 'next/link'
import { KAKAO_AUTH_URL } from '@/_lib/kakao'

export default function Login() {
  const onLoginhandler = () => {
    const code = new URL(window.location.href).searchParams.get('code')
    console.log('로그인')
    console.log(code)
  }
  return (
    <div>
      <Link href={KAKAO_AUTH_URL}>
        <NormalButton
          buttonText="카카오로 3초만에 로그인"
          buttonType="next"
          onClick={onLoginhandler}
        />
      </Link>
    </div>
  )
}
