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
        background: 'mt-2',
        image: beforeMatch,
        textUi: 'mb-7',
        imageUi: 'mt-4',
      }
    case 'AFTER':
      switch (gender) {
        case 'MALE':
          return {
            targetHour: 20,
            logo: pinkLogo,
            background: 'pt-2 bg-[#FFE5E7] h-screen',
            image: afterMatchMale,
            textUi: '',
            imageUi: '',
          }
        case 'FEMALE':
          return {
            targetHour: 20,
            logo: pinkLogo,
            background: 'pt-2 bg-[#FFE5E7] h-screen',
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
      } h-screen flex flex-col relative`}
    >
      <Image
        src={getBGStyle(type, gender).logo}
        alt="graylogo"
        className={`${
          getBGStyle(type, gender).textUi
        } w-[85px] h-[13px] mt-5 mx-auto`}
      />
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
        className={`-mt-5 ${getBGStyle(type, gender).imageUi}`}
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
