'use client'

import Timer from '@/_components/common/Timer'
import React from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'

export default function HomePage() {
  return (
    <div className="flex flex-col mt-2">
      <p className="p-10 mx-auto text-center text-[#B3B3B3]">moodmate</p>
      <TimerFirstText />
      <Timer targetHour={22} />
      <TimerMiddleText />
      <p className="p-9 mx-auto text-center">로고</p>
      <NavBar />
    </div>
  )
}
