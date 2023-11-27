import { AFTER_TIMER_GUIDE, BEFORE_TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

interface TextProps {
  type: 'BEFORE' | 'AFTER'
}

const getTextStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return {
        text: 'pt-6 text-[#333333] bg-[#FFE5E7]',
        triangle: 'border-t-[#FFE5E7]',
        match: BEFORE_TIMER_GUIDE.DESCRIPTION,
      }
    case 'AFTER':
      return {
        text: 'pt-7 text-[#FFFFFF] bg-[#FD8188]',
        triangle: 'border-t-[#FD8188]',
        match: AFTER_TIMER_GUIDE.DESCRIPTION,
      }
    default:
      return {
        text: '',
        triangle: '',
        match: '',
      }
  }
}
const TimerMiddleText = ({ type }: TextProps) => {
  return (
    <div className="mt-7 flex justify-center items-center text-center flex-col mx-auto">
      <p
        className={`${
          getTextStyle(type).text
        } font-bold w-[221px] h-[74px] rounded-[30px]`}
      >
        {getTextStyle(type).match}
      </p>
      <div
        className={`w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[15px] ${getTextStyle(type).triangle}
  border-r-[10px] border-r-transparent`}
      />
    </div>
  )
}

export default TimerMiddleText