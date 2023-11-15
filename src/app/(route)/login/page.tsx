'use client'

import NormalButton from '@/_components/common/NormalButton'
import Link from 'next/link'
import { KAKAO_AUTH_URL } from '@/_lib/kakao'
import React from 'react'

export default function Login() {
  const onLoginhandler = () => {
    // const code = new URL(window.location.href).searchParams.get('code')
    console.log('로그인 시작')
  }
  return (
    <div>
      <Link href={KAKAO_AUTH_URL}>
        <NormalButton
          buttonText="카카오로 3초만에 로그인"
          buttonType="large"
          onClick={onLoginhandler}
          className="bg-yellow-400 text-black"
        />
      </Link>
    </div>
  )
}
