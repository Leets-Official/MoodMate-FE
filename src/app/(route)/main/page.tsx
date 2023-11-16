'use client'

import Timer from '@/_components/common/Timer'
import React from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <p className="p-9 mx-auto text-center">로고</p>
      <TimerFirstText />
      <Timer targetHour={22} />
      <TimerMiddleText />
      <p className="p-9 mx-auto text-center">로고</p>
    </div>
  )
}
