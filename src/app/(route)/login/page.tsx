'use client'

import Image from 'next/image'
import { LOGIN_PAGE } from '@/_constants/login'
import React from 'react'
import loginImage from '../../../../public/illustration/common/login/login.png'
import google from '../../../../public/illustration/common/login/google.png'

export default function Login() {
  const handleLogin = () => {
    window.location.href = `${process.env.GOOGLE_LOGIN}oauth/login/google`
  }
  return (
    <section className="flex flex-col h-screen mx-5 scrollbar-hide">
      <div className="h-[20%]">
        <div className="flex font-bold text-[20px] ml-5 mt-[20%] desktop:mt-[20%]">
          {LOGIN_PAGE.FIRST}
          <div className="ml-1.5 text-primary">{LOGIN_PAGE.SECOND}</div>
          {LOGIN_PAGE.THIRD}
        </div>
        <div className="flex font-bold text-[20px] ml-5">
          <div className="text-primary">{LOGIN_PAGE.FOUR}</div>
          {LOGIN_PAGE.FIVE}
        </div>
      </div>
      <div className="h-[50%]">
        <Image
          src={loginImage}
          alt="loginImage"
          className="w-full mt-10 mb-24 desktop:mt-10 desktop:mb-14"
        />
      </div>
      <Image
        src={google}
        alt="구글로그인버튼"
        onClick={handleLogin}
        className="hover:cursor-pointer mt-7 w-full mx-auto"
      />
      <div className="text-center text-xs text-secondary ml-2 mt-4">
        <p>회원가입 시 개인정보 제공 및 대화 내용 저장에 동의합니다.</p>
        <p>서비스 종료 후 모든 정보는 폐기처리 됩니다.</p>
      </div>
    </section>
  )
}
