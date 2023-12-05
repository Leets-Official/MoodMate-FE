import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NICK_NAME_PAGE, INPUT_NICKNAME } from '@/_constants'
import Input from '../Input'
import NormalButton from '../NormalButton'

interface UserNicknameProps {
  pageNum: string
}

const UserNickname = ({ pageNum }: UserNicknameProps) => {
  const route = useRouter()
  const [inputValue, setInputValue] = useState('')
  const [inputCount, setinputCount] = useState('0/5')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, INPUT_NICKNAME.MAX)
    setInputValue(newValue)

    const countText = `${newValue.length}/${INPUT_NICKNAME.MAX}`
    setinputCount(countText)
  }

  const nextRoute = () => {
    route.push(`/userinfo/${parseInt(pageNum, 10) + 1}`)
  }

  const inputStyles = {
    defaultStyles: 'bg-lightgray',
    activeStyles: 'bg-[#FC4F59]',
  }

  const buttonStyles = {
    defaultStyles: 'bg-gray-300',
    activeStyles: 'text-white bg-[#FC4F59]',
  }

  return (
    <div>
      <div className="mt-[35px] mb-[201px]">
        <div className="text-darkgray text-bold">
          {NICK_NAME_PAGE.GREETINGS1}
        </div>
        <div>{NICK_NAME_PAGE.GREETINGS2}</div>
        <div>{NICK_NAME_PAGE.WRNINGS}</div>
      </div>
      <div className="w-[312px] h-[55px]">
        <Input
          sort="info"
          textValue={inputValue}
          placeholder={NICK_NAME_PAGE.INPUTBOX}
          onChange={handleInputChange}
          className={` placeholder:text-secondary placeholder:text-base placeholder:leading-[174%] focus:outline-none ml-[22px] mr-[130px]`}
        />
        <span className="text-[12px] text-secondary">{inputCount}</span>
        <div
          className={`w-full h-[2px] mt-[3px] rounded-[2.415px] ${
            inputValue.length > 0
              ? inputStyles.activeStyles
              : inputStyles.defaultStyles
          }`}
        />
        <div>{NICK_NAME_PAGE.GUIDE}</div>
      </div>

      <NormalButton
        buttonText="다음"
        onClick={nextRoute}
        buttonType="large"
        className={`mt-[160px] rounded-md ${
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
