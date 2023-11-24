import { AFTER_TIMER_GUIDE, BEFORE_TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

interface TextProps {
  type: 'BEFORE' | 'AFTER'
}

const getTextStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return (
        <div className="mt-7 flex justify-center items-center text-center flex-col mx-auto">
          <p className="pt-6 text-[#333333] font-bold bg-[#FFE5E7] w-[221px] h-[74px] rounded-[30px]">
            {BEFORE_TIMER_GUIDE.DESCRIPTION}
          </p>
          <div
            className="w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[15px] border-t-[#FFE5E7]
  border-r-[10px] border-r-transparent"
          />
        </div>
      )
    case 'AFTER':
      return (
        <div className="mt-7 flex justify-center items-center text-center flex-col mx-auto pt-7 text-[#FFFFFF] font-bold bg-[#FD8188] w-[221px] h-[74px] rounded-[30px]">
          <p>{AFTER_TIMER_GUIDE.DESCRIPTION_ONE}</p>
          <p className="mb-3.5">{AFTER_TIMER_GUIDE.DESCRIPTION_TWO}</p>
          <div
            className="w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[15px] border-t-[#FD8188]
  border-r-[10px] border-r-transparent"
          />
        </div>
      )
    default:
      return <p>디폴트</p>
  }
}
const TimerMiddleText = ({ type }: TextProps) => {
  return <section>{getTextStyle(type)}</section>
}

export default TimerMiddleText
