'use client'

import Timer from '@/_components/common/Timer'
import React, { useEffect } from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'
import { useMainQuery } from '@/_hooks/useMainQuery'

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
  const { isLoading, isError, data } = useMainQuery()
  useEffect(() => {
    console.log(data)
  }, [data])
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  const { roomActive } = data
  const updatedType = roomActive ? 'AFTER' : 'BEFORE'
  return (
    <div className={`${getBGStyle(updatedType).background} flex flex-col`}>
      <p className={`${getBGStyle(updatedType).logo} p-10 mx-auto text-center`}>
        moodmate
      </p>
      <TimerFirstText type={updatedType} />
      <Timer targetHour={getBGStyle(updatedType).targetHour} />
      <TimerMiddleText type={updatedType} />
      <p className="p-9 mx-auto text-center">로고</p>
      <NavBar type={updatedType} roomId={data.roomId} userId={data.userId} roomActive={data.roomActive}/>
    </div>
  )
}
export default MainPage
