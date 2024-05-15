'use client'

import Timer from '@/_components/common/Timer'
import TimerFirstText from '@/_components/timer/containers/TimerFirstText'
import TimerMiddleText from '@/_components/timer/containers/TimerMiddleText'
import NavBar from '@/_components/common/NavBar'
import { useMainQuery } from '@/_hooks/useMainQuery'
import Image from 'next/image'
import Loading from '@/_components/common/Loading'
import afterMatchFemale from 'public/illustration/female/main/afterMatch.png'
import afterMatchMale from 'public/illustration/male/main/afterMatch.png'
import beforeMatch from 'public/illustration/common/main/beforeMatch.png'
import grayLogo from 'public/illustration/common/logo/graylogo.png'
import pinkLogo from 'public/illustration/common/logo/pinklogo.png'
import ErrorPage from '@/(route)/error'
import Icons from '@/_components/common/Icons'
import { info } from '@/_ui/IconsPath'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface MatchProps {
  type: 'BEFORE' | 'AFTER'
  gender: 'MALE' | 'FEMALE'
}

const getBGStyle = (type: string, gender: string) => {
  switch (type) {
    case 'BEFORE':
      return {
        targetHour: 22,
        logo: grayLogo,
        background: '',
        image: beforeMatch,
        textUi: 'mb-7',
        imageUi: 'ml-7 mt-3 w-[300px]',
      }
    case 'AFTER':
      switch (gender) {
        case 'MALE':
          return {
            targetHour: 20,
            logo: pinkLogo,
            background:
              'w-[90%] pt-2 h-screen background: bg-gradient-to-b from-[#FFFCE5] to-[#FFF7BB]',
            image: afterMatchMale,
            textUi: '',
            imageUi: '',
          }
        case 'FEMALE':
          return {
            targetHour: 20,
            logo: pinkLogo,
            background:
              'w-[90%] pt-2 h-screen background: bg-gradient-to-b from-[#FFFCE5] to-[#FFF7BB]',
            image: afterMatchFemale,
            textUi: '',
            imageUi: '',
          }
        default:
          return {
            logo: '',
            background: '',
            targetHour: 0,
            image: '',
            textUi: '',
            imageUi: '',
          }
      }
    default:
      return {
        logo: '',
        background: '',
        targetHour: 0,
        image: '',
        textUi: '',
        imageUi: '',
      }
  }
}
const MainPage = ({ type, gender }: MatchProps) => {
  const route = useRouter()
  const { isLoading, isError, data } = useMainQuery()
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <ErrorPage />
  }
  const { roomActive, roomId, userId } = data.mainPageResponse
  return (
    <div
      className={`${
        getBGStyle(type, gender).background
      } h-full justify-center pt-8 w-full flex flex-col relative desktop:pt-16`}
    >
      <Icons
        name={info}
        className="mt-4 absolute top-0 right-0 mr-4 cursor-pointer"
        onClick={() => route.push('/announcement')}
      />
      <TimerFirstText type={type} />
      <Timer targetHour={getBGStyle(type, gender).targetHour} />
      <TimerMiddleText type={type} />
      <Image
        src={getBGStyle(type, gender).image}
        alt="Matching"
        className={`${getBGStyle(type, gender).imageUi}`}
      />
      <NavBar
        type={type}
        roomId={roomId}
        userId={userId}
        roomActive={roomActive}
        gender={gender}
      />
    </div>
  )
}
export default MainPage
