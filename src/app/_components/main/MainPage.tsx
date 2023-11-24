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
      return {
        targetHour: 22,
        logo: 'text-[#B3B3B3]',
        background: 'mt-2',
      }
    case 'AFTER':
      return {
        targetHour: 20,
        logo: 'text-[#FD8188]',
        background: 'pt-2 bg-[#FFE5E7] h-screen',
      }
    default:
      return {
        logo: '',
        background: '',
        targetHour: 0,
      }
  }
}
const MainPage = ({ type }: MatchProps) => {
  return (
    <div className={`${getBGStyle(type).background} flex flex-col`}>
      <p className={`${getBGStyle(type).logo} p-10 mx-auto text-center`}>
        moodmate
      </p>
      <TimerFirstText type={type} />
      <Timer targetHour={getBGStyle(type).targetHour} />
      <TimerMiddleText type={type} />
      <p className="p-9 mx-auto text-center">로고</p>
      <NavBar type={type} />
    </div>
  )
}
export default MainPage