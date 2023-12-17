import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NICK_NAME_PAGE, INPUT_NICKNAME } from '@/_constants'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import NormalButton from '../NormalButton'
import Input from '../Input'

interface UserNicknameProps {
  pageNum: string
}

export function useSSR() {
  const [isInitialInput, setisInitialInput] = useState(true)
  const [nicknameValue, setNicknameValue] = useRecoilState(userInfoState)

  useEffect(() => {
    setisInitialInput(false)
  }, [])

  return [
    isInitialInput ? useRecoilValue(userInfoState) : nicknameValue,
    setNicknameValue,
  ] as const
}

const UserNickname = ({ pageNum }: UserNicknameProps) => {
  const route = useRouter()
  const [nickname, setNickname] = useSSR()
  const [inputValue, setInputValue] = useState(nickname.nickname)
  const [inputCount, setinputCount] = useState(`${nickname.nickname.length}/5`)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, INPUT_NICKNAME.MAX)
    setInputValue(newValue)
    setinputCount(`${newValue.length}/5`)
  }

  const nextRoute = () => {
    setNickname((prevNickname) => ({
      ...prevNickname,
      nickname: inputValue,
    }))
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const calculateInputCount = (value: string) => `${value.length}/5`

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined'
    if (!isBrowser) {
      return
    }

    const fetchData = async () => {
      const storedUserInfo = sessionStorage.getItem('userInfoState')
      if (storedUserInfo !== null) {
        const parsedUserInfo = JSON.parse(storedUserInfo)
        const storedNickname = parsedUserInfo?.userInfoState?.nickname
        if (storedNickname) {
          setNickname((prevNickname) => ({
            ...prevNickname,
            nickname: storedNickname,
          }))
          setInputValue(storedNickname)
          setinputCount(calculateInputCount(storedNickname))
        }
      }
    }

    fetchData()
  }, [])

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-primar',
  }

  const buttonStyles = {
    defaultStyles: 'bg-secondary',
    activeStyles: 'text-white bg-primary',
  }

  return (
    <div className="relative h-[560px] w-[312px]">
      <div className="mt-[35px] mb-[168px]">
        <div className="text-darkgray font-bold text-xl font-sans">
          <div>{NICK_NAME_PAGE.GREETINGS1}</div>
          <div>{NICK_NAME_PAGE.GREETINGS2}</div>
        </div>
        <div className="mt-[10px] text-secondary font-normal text-base font-sans">
          {NICK_NAME_PAGE.WARNINGS}
        </div>
      </div>
      <div className="w-[312px] h-[55px]">
        <Input
          sort="info"
          textValue={inputValue}
          placeholder={NICK_NAME_PAGE.INPUTBOX}
          onChange={handleInputChange}
          className="w-[240px] placeholder:text-secondary placeholder:text-base placeholder:leading-[174%] focus:outline-none ml-[22px] mr-[30px]"
        />
        <span className="text-[12px] font-sans text-secondary">
          {inputCount}
        </span>
        <div
          className={`font-sans w-full h-[2px] mt-[3px] rounded-[2.415px] ${
            inputValue.length > 0
              ? inputStyles.activeStyles
              : inputStyles.defaultStyles
          }`}
        />
        <div className="text-secondary font-normal text-xs font-notosans mt-[8px] text-right">
          {NICK_NAME_PAGE.GUIDE}
        </div>
      </div>

      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`font-sans absolute bottom-0 rounded-md text-darkgray ${
          inputValue.length > 0
            ? buttonStyles.activeStyles
            : buttonStyles.defaultStyles
        }`}
        isActive={inputValue.trim() !== ''}
      />
    </div>
  )
}

export default UserNickname
