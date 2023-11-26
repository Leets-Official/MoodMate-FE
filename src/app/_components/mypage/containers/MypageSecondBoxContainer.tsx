'use client'

import React, { useState } from 'react'
import Keyword from '@/_components/information/Keyword'
import Icons from '@/_components/common/Icons'
import { downarrow, rightarrow } from '@/_ui/IconsPath'
import NormalButton from '@/_components/common/NormalButton'
import MoodyAge from '@/_components/information/MoodyAge'
import Department from '@/_components/information/Department'
import DateMood from '@/_components/information/DateMood'
import InfoDetail from '@/_components/common/InfoDetail'

const MypageSecondBoxContainer = () => {
  return (
    <section className="flex flex-col">
      <p className="ml-6 mt-4 text-[12px] text-[#808080]">내가 고른 항목</p>
      <div className="ml-6 mt-">
        <InfoDetail
          titleText="키워드"
          component={Keyword()}
          className="-ml-2"
        />
        <InfoDetail
          titleText="무디 나이"
          component={MoodyAge()}
          className="-ml-0"
        />
        <InfoDetail
          titleText="선호 조건 선택"
          component={Department()}
          className="ml-4"
        />
        <InfoDetail
          titleText="데이트 무드"
          component={DateMood()}
          className="ml-2"
        />
      </div>
      <div className="w-auto h-2 bg-[#E6E6E6] mt-6" />
    </section>
  )
}
export default MypageSecondBoxContainer