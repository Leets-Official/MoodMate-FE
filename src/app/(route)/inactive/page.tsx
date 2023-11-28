'use client'

import React from 'react'
import NormalButton from '@/_components/common/NormalButton'
import { useRouter } from 'next/navigation'

export default function InactivePage() {
  const route = useRouter()
  const rematching = () => {
    route.push('/main')
  }
  const moveToMypage = () => {
    route.push('/mypage')
  }
  return (
    <div className="flex flex-col">
      <p className="p-10 mx-auto text-center text-[#B3B3B3]">moodmate</p>
      <div className="mt-7 flex items-center text-center flex-col mx-auto">
        <p className="pt-7 font-bold w-[260px] h-[106px] rounded-[8px] bg-[#FFE5E7] text-[#333333]">
          무디와 다시 즐거운 시간 <br /> 보내고 싶으신가요?
        </p>
        <div
          className={`w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[18px] border-t-[#FFE5E7]
  border-r-[10px] border-r-transparent`}
        />
      </div>
      <div className="flex flex-col items-center">
        <NormalButton
          buttonText="매칭 다시 시작하기"
          onClick={rematching}
          buttonType="large"
          className="bg-[#FC4F59] text-white text-[14px] w-[312px] h-[48px] rounded-[8px] mt-20"
          isActive
          color=""
        />
        <NormalButton
          buttonText="매칭 다시 시작하기"
          onClick={moveToMypage}
          buttonType="large"
          className="bg-[#D6D6D6] text-[14px] w-[312px] h-[48px] rounded-[8px] mt-3"
          isActive
          color=""
        />
      </div>
    </div>
  )
}
