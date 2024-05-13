'use client'

/* eslint-disable no-nested-ternary */
import { useRouter } from 'next/navigation'
import { DATE_MOOD_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { preferInfoState, userInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { postUserData } from '@/_service/userinfo'
import Cookies from 'js-cookie'
import NormalButton from '../NormalButton'
import SelectedButton from '../SelectedButton'

interface ButtonSelectedState {
  [key: string]: {
    selected: boolean
    imgSrc: string
  }
}

interface UserMoodProps {
  isEdit?: boolean
}

const UserMood = ({ isEdit }: UserMoodProps) => {
  const route = useRouter()

  const [usersInfo, setUsersInfoState] = useRecoilState(userInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(preferInfoState)
  const [buttonSelected, setButtonSelected] = useState<ButtonSelectedState>({
    뜨거운: {
      selected: false,
      imgSrc: '/illustration/common/datemood/active.png',
    },
    편안한: {
      selected: false,
      imgSrc: '/illustration/common/datemood/emotional.png',
    },
    설레는: {
      selected: false,
      imgSrc: '/illustration/common/datemood/unusual.png',
    },
    재밌는: {
      selected: false,
      imgSrc: '/illustration/common/datemood/funny.png',
    },
  })

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const handleError = () => {
    alert('정보 저장에 실패했습니다. 재로그인 후 이용해주세요!')
    clearCookiesAndRedirect()
  }

  const postUserDataMutation = useMutation({
    mutationFn: () => postUserData(usersInfo, userInfo),
    onSuccess: () => {},
    onError: handleError,
  })

  const clearCookiesAndRedirect = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    route.push('/login')
  }

  const nextRoute = async () => {
    try {
      if (
        Object.values(userInfo).some((value) => value === '') ||
        usersInfo.keywords.length === 0
      ) {
        alert(
          '정보 입력이 잘못되었습니다. 로그인 페이지로 이동합니다. 재로그인 해주세요.',
        )
        clearCookiesAndRedirect()
        return
      }

      console.log(userInfo)
      console.log(usersInfo)
      await postUserDataMutation.mutateAsync()
      route.push('/main')
    } catch (error) {
      handleError()
      throw error
    }
  }

  const handleButtonClick = (mood: keyof ButtonSelectedState) => {
    setButtonSelected((prev) => {
      const updatedState = { ...prev }
      Object.keys(updatedState).forEach((key) => {
        updatedState[key].selected = key === mood && !prev[key].selected
      })
      return updatedState
    })

    setUserInfoState((prev) => ({
      ...prev,
      preferMood: prev.preferMood === mood.toString() ? '' : mood.toString(),
    }))
  }

  useEffect(() => {
    console.log(userInfo)
    console.log(usersInfo)
    setButtonSelected((prev) => {
      const updatedState = { ...prev }
      Object.keys(updatedState).forEach((key) => {
        updatedState[key].selected = key === userInfo.preferMood
      })
      console.log(updatedState)
      return updatedState
    })
  }, [userInfo])

  return (
    <div className="relative h-full w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{DATE_MOOD_PAGE.GREETINGS}</div>
        </div>
      </div>
      <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 justify-center items-center flex-wrap ">
        {Object.entries(buttonSelected).map(([mood, { selected, imgSrc }]) => (
          <SelectedButton
            key={mood}
            buttonText={`${mood} ${DATE_MOOD_PAGE.DATE}`}
            buttonType="MOOD"
            isActive={true}
            onClick={() => handleButtonClick(mood as keyof ButtonSelectedState)}
            imgSrc={imgSrc}
            imgSizeW={75}
            imgSizeH={85}
            imgClassName="mb-5"
            className={`mx-2 my-2 text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
              selected
                ? 'border-[1px]  bg-onepink border-primary text-primary'
                : 'bg-zeropink text-darkgray'
            }`}
          />
        ))}
      </div>
      <NormalButton
        buttonText="매칭 시작"
        onClick={nextRoute}
        buttonType="large"
        className={`absolute bottom-0 mb-7 text-darkgray rounded-md ${
          Object.values(buttonSelected).some(({ selected }) => selected)
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={Object.values(buttonSelected).some(
          ({ selected }) => selected,
        )}
      />
    </div>
  )
}

export default UserMood
