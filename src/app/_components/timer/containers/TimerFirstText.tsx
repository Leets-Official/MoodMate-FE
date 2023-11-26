import { BEFORE_TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

const TimerFirstText = () => {
  return (
    <section className="mx-auto text-center">
      <p className="text-[12px] text-[#919191]">{BEFORE_TIMER_GUIDE.TITLE}</p>
      <p className="text-[21px] text-[#FC4F59] font-extrabold">
        {BEFORE_TIMER_GUIDE.SUB_TITLE}
      </p>
    </section>
  )
}
export default TimerFirstText