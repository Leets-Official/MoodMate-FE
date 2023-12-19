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

export default function UserMood() {
  const route = useRouter()

  const [usersInfo, setUsersInfoState] = useRecoilState(userInfoState)
  const [userInfo, setUserInfoState] = useRecoilState(preferInfoState)
  const [actButtonSelected, setActButtonSelected] = useState<boolean>(
    userInfo.preferMood === '활동적인',
  )
  const [emoButtonSelected, setEmoButtonSelected] = useState<boolean>(
    userInfo.preferMood === '감성 풍부한',
  )

  const [newButtonSelected, setNewButtonSelected] = useState<boolean>(
    userInfo.preferMood === '이색적인',
  )

  const [funButtonSelected, setFunButtonSelected] = useState<boolean>(
    userInfo.preferMood === '유쾌한',
  )

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  const postUserDataMutation = useMutation({
    mutationFn: () => postUserData(usersInfo, userInfo),
    onSuccess: () => {},
    onError: () => {
      alert('정보 저장에 실패했습니다. 재로그인 후 이용해주세요!')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      route.push('/login')
    },
  })

  const nextRoute = async () => {
    try {
      if (
        Object.values(userInfo).some((value) => value === '') ||
        usersInfo.keywords.length === 0
      ) {
        alert(
          '정보 입력이 잘못되었습니다. 로그인 페이지로 이동합니다. 재로그인 해주세요.',
        )
        route.push('/login')
        return
      }

      if (Object.values(userInfo).some((value) => value === '')) {
        alert(
          '선호 정보 입력이 잘못되었습니다. 로그인 페이지로 이동합니다. 재로그인 해주세요.',
        )
        route.push('/login')
        return
      }

      await postUserDataMutation.mutateAsync()
      route.push('/main')
    } catch (error) {
      alert('정보 저장에 실패했습니다. 재로그인 후 이용해주세요!')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      route.push('/login')
      throw error
    }
  }

  const handleActButtonClick = () => {
    if (actButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferMood: '' }))
      setActButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferMood: '활동적인' }))
      setActButtonSelected(true)
      setEmoButtonSelected(false)
      setFunButtonSelected(false)
      setNewButtonSelected(false)
    }
  }

  const handleEmoButtonClick = () => {
    if (emoButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferMood: '' }))
      setEmoButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferMood: '감성 풍부한' }))
      setEmoButtonSelected(true)
      setActButtonSelected(false)
      setFunButtonSelected(false)
      setNewButtonSelected(false)
    }
  }

  const handleNewButtonClick = () => {
    if (newButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferMood: '' }))
      setNewButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferMood: '이색적인' }))
      setNewButtonSelected(true)
      setFunButtonSelected(false)
      setActButtonSelected(false)
      setEmoButtonSelected(false)
    }
  }

  const handleFunButtonClick = () => {
    if (funButtonSelected) {
      setUserInfoState((prev) => ({ ...prev, preferMood: '' }))
      setFunButtonSelected(false)
    } else {
      setUserInfoState((prev) => ({ ...prev, preferMood: '유쾌한' }))
      setNewButtonSelected(false)
      setFunButtonSelected(true)
      setActButtonSelected(false)
      setEmoButtonSelected(false)
    }
  }

  useEffect(() => {
    setActButtonSelected(userInfo.preferMood === '활동적인')
    setEmoButtonSelected(userInfo.preferMood === '감성 풍부한')
    setFunButtonSelected(userInfo.preferMood === '유쾌한')
    setNewButtonSelected(userInfo.preferMood === '이색적인')
  }, [userInfo])

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[88px]">
        <div className="leading-normal text-darkgray font-bold text-xl font-sans">
          <div>{DATE_MOOD_PAGE.GREETINGS}</div>
        </div>
      </div>
      <div className="absolute flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 justify-center items-center flex-wrap ">
        <SelectedButton
          buttonText={`${DATE_MOOD_PAGE.ACT}\n${DATE_MOOD_PAGE.DATE}`}
          buttonType="MOOD"
          isActive
          onClick={handleActButtonClick}
          imgSrc="/illustration/common/datemood/active.png"
          imgSizeW={75}
          imgSizeH={85}
          className={`mx-2 my-2 font-sans text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
            actButtonSelected
              ? 'border-[1px]  bg-onepink border-primary text-primary'
              : 'bg-zeropink text-darkgray'
          }`}
        />
        <SelectedButton
          buttonText={`${DATE_MOOD_PAGE.EMO}\n${DATE_MOOD_PAGE.DATE}`}
          buttonType="MOOD"
          isActive
          onClick={handleEmoButtonClick}
          imgSrc="/illustration/common/datemood/emotional.png"
          imgSizeH={85}
          imgSizeW={75}
          imgClassName="h-[85px]"
          className={`mx-2 my-2  font-sans text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
            emoButtonSelected
              ? 'border-[1px]  bg-onepink border-primary text-primary'
              : 'bg-zeropink text-darkgray'
          }`}
        />
        <SelectedButton
          buttonText={`${DATE_MOOD_PAGE.NEW}\n${DATE_MOOD_PAGE.DATE}`}
          buttonType="MOOD"
          isActive
          onClick={handleNewButtonClick}
          imgSrc="/illustration/common/datemood/unusual.png"
          imgSizeH={85}
          imgSizeW={75}
          imgClassName="h-[85px]"
          className={`mx-2 my-2  font-sans text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
            newButtonSelected
              ? 'border-[1px] bg-onepink border-primary text-primary'
              : 'bg-zeropink text-darkgray'
          }`}
        />
        <SelectedButton
          buttonText={`${DATE_MOOD_PAGE.FUN}\n${DATE_MOOD_PAGE.DATE}`}
          buttonType="MOOD"
          isActive
          onClick={handleFunButtonClick}
          imgSrc="/illustration/common/datemood/funny.png"
          imgSizeH={85}
          imgSizeW={75}
          className={`mx-2 my-2 font-sans text-[14px] font-bold leading-none justify-end items-center rounded-3xl ${
            funButtonSelected
              ? 'border-[1px]  bg-onepink border-primary text-primary'
              : 'bg-zeropink text-darkgray'
          }`}
        />
      </div>
      <NormalButton
        buttonText="매칭 시작"
        onClick={nextRoute}
        buttonType="large"
        className={`font-sans absolute bottom-0  text-darkgray rounded-md ${
          actButtonSelected ||
          emoButtonSelected ||
          newButtonSelected ||
          funButtonSelected
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={
          actButtonSelected ||
          emoButtonSelected ||
          newButtonSelected ||
          funButtonSelected
        }
      />
    </div>
  )
}
