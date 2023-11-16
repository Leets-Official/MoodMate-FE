import { TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

const TimerFirstText = () => {
  return (
    <section className="mx-auto text-center">
      <p className="text-[12px] text-[#919191]">{TIMER_GUIDE.TITLE}</p>
      <p className="mt-3 text-[21px] text-[#5A5A5A] font-bold">
        {TIMER_GUIDE.SUB_TITLE}
      </p>
    </section>
  )
}
<div className="text-center mx-auto">
  <p className="mt-5 bg-[#313131] px-10 py-5 text-white rounded-[30px]">
    운명의 무디를 만날 시간!
  </p>
</div>
export default TimerFirstText
