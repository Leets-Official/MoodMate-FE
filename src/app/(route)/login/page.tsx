'use client'

import Image from 'next/image'
import loginImage from 'public/illustration/common/login/login.png'
import { LOGIN_PAGE } from '@/_constants/login'
import kakaoImage from 'public/illustration/common/login/kakao.png'

export default function Login() {
  const handleLogin = () => {
    if (typeof window !== 'undefined') {
      window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}`
    }
  }
  return (
    <section className="flex flex-col h-screen mx-5 scrollbar-hide">
      <div className="h-[22%]">
        <div className="flex font-bold text-[20px] ml-5 mt-[20%] desktop:mt-[20%]">
          {LOGIN_PAGE.FIRST}
          <div className="ml-1.5 text-[#E87775]">{LOGIN_PAGE.SECOND}</div>
          {LOGIN_PAGE.THIRD}
        </div>
        <div className="flex font-bold text-[20px] ml-5">
          <div className="text-[#E87775]">{LOGIN_PAGE.FOUR}</div>
          {LOGIN_PAGE.FIVE}
        </div>
      </div>
      <div className="h-[55%]">
        <Image
          src={loginImage}
          alt="loginImage"
          className="w-[90%] ml-[6%] mt-5"
        />
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-full mx-auto flex h-[45px] items-center justify-center gap-2 rounded-[7px] bg-[#FEE500]"
      >
        <div className="mt-1 flex">
          <Image
            src={kakaoImage}
            className="mr-3 mt-0.5 h-[18px] w-[18px]"
            alt="kakao"
          />
          <p>카카오계정으로 로그인</p>
        </div>
      </button>
      <div className="text-center text-xs text-gray-400 ml-2 mt-4">
        <p>회원가입 시 개인정보 제공 및 대화 내용 저장에 동의합니다.</p>
        <p>서비스 종료 후 모든 정보는 폐기처리 됩니다.</p>
      </div>
    </section>
  )
}
