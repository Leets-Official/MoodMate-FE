'use client'

import Timer from '@/_components/common/Timer'
import React, { useEffect } from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'
import { useMainQuery } from '@/_hooks/useMainQuery'
import Image from 'next/image'
import Loading from '@/_components/common/Loading'
import beforeMatch from '../../../../public/illustration/common/main/beforeMatch.png'
import beforeMatchOn from '../../../../public/illustration/common/main/beforeMatchOn.png'
import logo from '../../../../public/illustration/common/logo/graylogo.png'

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
    console.log(data?.mainPageResponse)
  }, [data])
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  const { roomId, userId } = data.mainPageResponse
  return (
    <div className={`${getBGStyle(type).background} flex flex-col`}>
      <Image
        src={logo}
        alt="graylogo"
        className="w-[85px] h-[13px] mt-10 mb-20 mx-auto"
      />
      <TimerFirstText type={type} />
      <Timer targetHour={getBGStyle(type).targetHour} />
      <TimerMiddleText type={type} />
      <Image
        src={beforeMatchOn}
        alt="beforeMatchOn"
        className="w-[156px] mx-auto mt-24 desktop:mt-4"
      />
      <Image src={beforeMatch} alt="beforeMatch" className="-mt-16" />
      <NavBar type={type} roomId={roomId} userId={userId} roomActive />
    </div>
  )
}
export default MainPage
