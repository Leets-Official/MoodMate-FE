'use client'

import React from 'react'
import NormalButton from '@/_components/common/NormalButton'
import { useRouter } from 'next/navigation'
import { INACTIVE_BUTTON } from '@/_constants'
import { useMutation } from '@tanstack/react-query'
import { patchInactiveMain } from '@/_service/main'

const InactiveFirstText = () => {
  const route = useRouter()
  const inactiveMutation = useMutation({
    mutationFn: patchInactiveMain,
    onSuccess: () => {
      window.location.reload()
    },
  })
  const moveToMypage = () => {
    route.push('/mypage')
  }
  return (
    <div className="flex flex-col items-center">
      <NormalButton
        buttonText={INACTIVE_BUTTON.REMATCH}
        onClick={() => inactiveMutation.mutate()}
        buttonType="large"
        className="bg-[#FC4F59] text-white text-[14px] w-[312px] h-[48px] rounded-[8px] mt-7"
        isActive
      />
      <NormalButton
        buttonText={INACTIVE_BUTTON.GOMAIN}
        onClick={moveToMypage}
        buttonType="large"
        className="bg-[#D6D6D6] text-[14px] w-[312px] h-[48px] rounded-[8px] mt-3"
        isActive
      />
    </div>
  )
}

export default InactiveFirstText
