import { TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

const TimerMiddleText = () => {
  return (
    <section className="mt-7 flex justify-center items-center text-center flex-col mx-auto">
      <p className="pt-6 text-[#333333] font-bold bg-[#FFE5E7] w-[221px] h-[74px] rounded-[30px]">
        {TIMER_GUIDE.SUBSCRIBE}
      </p>
      <div
        className="w-0 h-0
  border-l-[10px] border-l-transparent
  border-t-[15px] border-t-[#FFE5E7]
  border-r-[10px] border-r-transparent"
      />
    </section>
  )
}

export default TimerMiddleText
