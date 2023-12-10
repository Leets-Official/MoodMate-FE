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
    <div className="flex flex-col">
      <div className="flex font-bold text-[20px] mt-36 ml-12 desktop:mt-24">
        {LOGIN_PAGE.FIRST}
        <div className="ml-1.5 text-primary">{LOGIN_PAGE.SECOND}</div>
        {LOGIN_PAGE.THIRD}
      </div>
      <div className="flex font-bold text-[20px] ml-12">
        <div className="text-primary">{LOGIN_PAGE.FOUR}</div>
        {LOGIN_PAGE.FIVE}
      </div>
      <Image
        src={loginImage}
        alt="loginImage"
        className="w-[297px] mt-24 mb-24 mx-auto desktop:mt-10 desktop:mb-14"
      />
      <Image
        src={google}
        alt="구글로그인버튼"
        onClick={handleLogin}
        className="hover:cursor-pointer w-[312px] mx-auto"
      />
    </div>
  )
}
