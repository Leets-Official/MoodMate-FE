'use client'

import Timer from '@/_components/common/Timer'
import React, { useEffect } from 'react'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'
import { useMainQuery } from '@/_hooks/useMainQuery'
import Image from 'next/image'
import Loading from '@/_components/common/Loading'
import afterMatch from 'public/illustration/common/main/afterMatch.png'
import afterMatchCh from 'public/illustration/female/main/afterMatch.png'
import beforeMatchOn from 'public/illustration/common/main/beforeMatchOn.png'
import beforeMatch from 'public/illustration/common/main/beforeMatch.png'
import grayLogo from 'public/illustration/common/logo/graylogo.png'
import pinkLogo from 'public/illustration/common/logo/pinklogo.png'

interface MatchProps {
  type: 'BEFORE' | 'AFTER'
}

const getBGStyle = (type: string) => {
  switch (type) {
    case 'AFTER':
      return {
        targetHour: 22,
        logo: grayLogo,
        background: 'mt-2',
        image: beforeMatch,
        image2: beforeMatchOn,
        imageUi: '-mt-16',
        image2Ui: 'w-[156px] mx-auto mt-24 desktop:mt-4',
      }
    case 'BEFORE':
      return {
        targetHour: 20,
        logo: pinkLogo,
        background: 'pt-2 bg-[#FFE5E7] h-screen',
        image: afterMatch,
        image2: afterMatchCh,
        imageUi: '',
        image2Ui: '',
      }
    default:
      return {
        logo: '',
        background: '',
        targetHour: 0,
        image: '',
        imageUi: '',
        image2Ui: '',
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
  const { roomActive, roomId, userId } = data.mainPageResponse
  return (
    <div className={`${getBGStyle(type).background}  flex flex-col`}>
      <Image
        src={getBGStyle(type).logo}
        alt="graylogo"
        className="w-[85px] h-[13px] mt-10 mb-20 mx-auto"
      />
      <TimerFirstText type={type} />
      <Timer targetHour={getBGStyle(type).targetHour} />
      <TimerMiddleText type={type} />
      <Image
        src={beforeMatchOn}
        alt="beforeMatchOn"
        className={getBGStyle(type).image2Ui}
      />
      <Image
        src={beforeMatch}
        alt="beforeMatch"
        className={getBGStyle(type).imageUi}
      />
      <NavBar
        type={type}
        roomId={roomId}
        userId={userId}
        roomActive={roomActive}
      />
    </div>
  )
}
export default MainPage
