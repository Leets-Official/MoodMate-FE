'use client'

import { ChangeEvent, useState } from 'react'
import Icons from '@/_components/common/Icons'
import { send } from '@/_ui/IconsPath'
import useWebSocket from '@/_hooks/useWebSocket'
import Input from '../../common/Input'

const ChatInputContainer = () => {
  const [inputVal, setInputVal] = useState<string | null>(null)
  const { sendMessage } = useWebSocket()

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal((prev) => e.target.value)
  }

  const handleSendMessage = () => {
    if (inputVal) {
      sendMessage(1, inputVal) // roomId 일단 1로.
      setInputVal('')
    }
  }

  return (
    <div className="relative flex w-full justify-center h-10">
      <Input
        sort="chat"
        onClick={() => {}}
        className="bg-[#B3B3B3] rounded-3xl px-3"
        onFocus={() => {}}
        onChange={(e) => onChangeInput(e)}
        onEnterPress={handleSendMessage}
        textValue={inputVal || ''}
        placeholder="메시지를 입력하세요."
      />
      <div className="absolute flex justify-center items-center right-12 top-[25%] bg-[#999999] h-[24px] w-[24px] rounded-full">
        <Icons name={send} />
      </div>
    </div>
  )
}

export default ChatInputContainer
