'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NICK_NAME_PAGE, INPUT_NICKNAME } from '@/_constants'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userInfoState } from '@/_atom/userinfo'
import NormalButton from '../NormalButton'
import Input from '../Input'
import { useMainQuery } from '@/_hooks/useMainQuery'
import Error from '@/(route)/error'

interface UserNicknameProps {
  pageNum: string
}

const UserNickname = ({ pageNum }: UserNicknameProps) => {
  const route = useRouter()
  const [nickname, setNickname] = useRecoilState(userInfoState)
  const userInfo = useRecoilValue(userInfoState)
  const [inputValue, setInputValue] = useState(userInfo.nickname)
  const [inputCount, setinputCount] = useState(`${inputValue.length}/5`)

  const { isError, data } = useMainQuery()

  if (isError) {
    return <Error />
  }
  if (
    data?.mainPageResponse.userGender == 'MALE' ||
    data?.mainPageResponse.userGender == 'FEMALE'
  ) {
    route.push('/main')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, INPUT_NICKNAME.MAX)
    const koeranOnly = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/g
    if (koeranOnly.test(newValue)) {
      setInputValue(newValue)
      setinputCount(`${newValue.length}/${INPUT_NICKNAME.MAX}`)
    }
  }

  const nextRoute = () => {
    setNickname((prevNickname) => ({
      ...prevNickname,
      nickname: inputValue,
    }))
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-primary',
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
          className="w-[230px] placeholder:text-secondary placeholder:text-base placeholder:leading-[174%] focus:outline-none ml-[22px] mr-[30px]"
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
