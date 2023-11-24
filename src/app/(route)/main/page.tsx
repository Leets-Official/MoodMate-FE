'use client'

import Timer from '@/_components/common/Timer'
import React from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'

interface MatchProps {
  type: 'BEFORE' | 'AFTER'
}

const getBGStyle = (type: string) => {
  switch (type) {
    case 'BEFORE':
      return (
        <div className="flex flex-col mt-2">
          <p className="p-10 mx-auto text-center text-[#B3B3B3]">moodmate</p>
          <TimerFirstText type="BEFORE" />
          <Timer targetHour={22} />
          <TimerMiddleText type="BEFORE" />
          <p className="p-9 mx-auto text-center">로고</p>
          <NavBar type="BEFORE" />
        </div>
      )
    case 'AFTER':
      return (
        <div className="flex flex-col pt-2 bg-[#FFE5E7] h-screen">
          <p className="p-10 mx-auto text-center text-[#FD8188]">moodmate</p>
          <TimerFirstText type="AFTER" />
          <Timer targetHour={20} />
          <TimerMiddleText type="AFTER" />
          <p className="p-9 mx-auto text-center">로고</p>
          <NavBar type="AFTER" />
        </div>
      )
    default:
      return <p>디폴트</p>
  }
}
const MainPage = ({ type }: MatchProps) => {
  return <div>{getBGStyle('BEFORE')}</div>
}
export default MainPage
