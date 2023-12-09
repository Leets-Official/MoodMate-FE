'use client'

import { useUserinfoPostMutation } from '@/_hooks/useUserinfoPostMutation'
import { useRouter } from 'next/navigation'
import { DATE_MOOD_PAGE } from '@/_constants'
import { useRecoilState } from 'recoil'
import { preferInfoState, userInfoState } from '@/_atom/userinfo'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log(usersInfo)
    console.log(userInfo)
  }, [usersInfo, userInfo])

  const userMutation = useUserinfoPostMutation()

  const nextRoute = async () => {
    try {
      await userMutation.mutateAsync({
        userInfo: usersInfo,
        preferInfo: userInfo,
      })

      route.push('/main')
      console.log(userInfo)
      console.log(usersInfo)
    } catch (error) {
      console.error('Error posting user or prefer info to server : ', error)
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
          className={`mx-2 my-2 font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
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
          className={`mx-2 my-2  font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
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
          className={`mx-2 my-2  font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
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
          className={`mx-2 my-2 font-sans text-[14px] font-normal justify-end items-center gap-[10px] rounded-3xl ${
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
        className={`absolute bottom-0  text-darkgray rounded-md ${
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
