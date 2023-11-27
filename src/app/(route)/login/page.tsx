'use client'

import NormalButton from '@/_components/common/NormalButton'
import { GOOGLE_AUTH_URL } from '@/_lib/google'
import React from 'react'

export default function Login() {
  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL
  }
  return (
    <div className="flex flex-col">
      <p className="mx-auto text-blue-600 mb-60 mt-52">로고</p>
      <NormalButton
        buttonText="Google 게정으로 로그인"
        buttonType="large"
        onClick={handleLogin}
        className="text-[15px] text-black mx-auto rounded-[8px] shadow shadow-gray-500"
        color=""
        isActive
      />
    </div>
  )
}
