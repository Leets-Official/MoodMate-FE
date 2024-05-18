'use client'

import Input from '../../common/Input'
import useWebsocket from '@/_hooks/useWebSocket'
import Icons from '@/_components/common/Icons'
import { send } from '@/_ui/IconsPath'
import { ChangeEvent, useRef, useState } from 'react'
import { CHAT_INPUT } from '@/_constants'

interface ChatInputContainerProps {
  roomId: number
  userId: number
}

const ChatInputContainer = ({ roomId, userId }: ChatInputContainerProps) => {
  const MAX = 250
  const [inputVal, setInputVal] = useState<string>('')
  const { sendMessage } = useWebsocket(roomId)
  const inputRef = useRef<HTMLInputElement>(null)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > MAX) {
      alert('입력은 최대 250자까지 가능합니다.')
      setInputVal(value.slice(0, MAX))
    } else {
      setInputVal(value)
    }
  }

  const handleSendMessage = () => {
    const messageTosend = {
      userId,
      roomId,
      content: inputVal.trim(),
    }

    if (inputVal.trim() === '') {
      alert('메시지를 입력해주세요.')
      return
    }

    sendMessage(messageTosend)
    setInputVal('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="fixed w-full bottom-0 flex desktop:w-[378px] justify-center h-[45px] py-3 pb-3  ">
      <Input
        ref={inputRef}
        sort="chat"
        onClick={() => {}}
        className="rounded-3xl bg-onepink px-4 text-darkgray border-none outline-none"
        onFocus={() => {}}
        onChange={(e) => onChangeInput(e)}
        onEnterPress={handleSendMessage}
        textValue={inputVal || ''}
        placeholder={CHAT_INPUT.MESSAGE}
      />
      <div className="absolute flex justify-center items-center right-[8%] top-[30%] bg-threepink h-[34px] w-[34px] rounded-full cursor-pointer">
        <Icons name={send} onClick={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatInputContainer
