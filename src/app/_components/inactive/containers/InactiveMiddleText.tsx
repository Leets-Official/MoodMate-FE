'use client'

import React from 'react'
import NormalButton from '@/_components/common/NormalButton'
import { useRouter } from 'next/navigation'

const InactiveFirstText = () => {
  const route = useRouter()
  const rematching = () => {
    route.push('/main')
  }
  const moveToMypage = () => {
    route.push('/mypage')
  }
  return (
    <div className="flex flex-col items-center">
      <NormalButton
        buttonText="매칭 다시 시작하기"
        onClick={rematching}
        buttonType="large"
        className="bg-[#FC4F59] text-white text-[14px] w-[312px] h-[48px] rounded-[8px] mt-20"
        isActive
      />
      <NormalButton
        buttonText="마이페이지로 돌아가기"
        onClick={moveToMypage}
        buttonType="large"
        className="bg-[#D6D6D6] text-[14px] w-[312px] h-[48px] rounded-[8px] mt-3"
        isActive
      />
    </div>
  )
}

export default InactiveFirstText
