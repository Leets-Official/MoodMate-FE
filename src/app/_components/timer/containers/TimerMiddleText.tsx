import { BEFORE_TIMER_GUIDE } from '@/_constants/main'
import React from 'react'

const TimerMiddleText = () => {
  return (
    <section className="text-center mx-auto mt-5 bg-[#313131] px-10 py-5 text-white rounded-[30px]">
      <p>{BEFORE_TIMER_GUIDE.DESCRIPTION}</p>
    </section>
  )
}

export default TimerMiddleText
