'use client'

import NormalButton from '@/_components/common/NormalButton'
import { KAKAO_AUTH_URL } from '@/_lib/kakao'
import React from 'react'
import Icons from '@/_components/common/Icons'

export default function Login() {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  return (
    <div className="flex flex-col">
      <p className="mx-auto text-blue-600 mb-60 mt-52">로고</p>
      <NormalButton
        buttonText="카카오로 로그인"
        buttonType="large"
        onClick={handleLogin}
        className="bg-[#FEE500] text-[15px] text-black mx-auto rounded-[8px] hover:bg-amber-300"
      />
    </div>
  )
}
