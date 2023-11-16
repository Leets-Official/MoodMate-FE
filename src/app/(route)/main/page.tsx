'use client'

import Timer from '@/_components/common/Timer'
import React from 'react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto text-center">
        <p className="p-9">로고</p>
        <p className="text-[12px] text-[#919191]">
          매일 밤 10시 매칭이 종료됩니다
        </p>
        <p className="mt-3 text-[21px] text-[#5A5A5A] font-bold">
          매칭 완료까지 남은 시간
        </p>
        <p className="text-[40px] font-bold text-[#333333]">
          <Timer targetHour={22} />
          <Timer targetHour={20} />
        </p>
      </div>
      <div className="flex text-[#b3b3b3] -mt-2 mx-auto">
        <p className="mx-6">hrs</p>
        <p className="mx-6">min</p>
        <p className="mx-6">sec</p>
      </div>
      <div className="text-center mx-auto">
        <p className="mt-5 bg-[#313131] px-10 py-5 text-white rounded-[30px]">
          운명의 무디를 만날 시간!
        </p>
        <p className="mt-10">로고</p>
      </div>
    </div>
  )
}
