'use client'

import { ChangeEvent, useState } from 'react'
import Icons from '@/_components/common/Icons'
import { send } from '@/_ui/IconsPath'
import useWebsocket from '@/_hooks/useWebSocket'
import { CHAT_INPUT } from '@/_constants'
import Input from '../../common/Input'

interface ChatInputContainerProps {
  roomId: number
  userId: number
}

const ChatInputContainer = ({ roomId, userId }: ChatInputContainerProps) => {
  const [inputVal, setInputVal] = useState<string>('')
  const { sendMessage } = useWebsocket(roomId)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(() => e.target.value)
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
  }

  return (
    <div className="fixed bottom-0 flex desktop:w-[378px] justify-center h-[65px] py-3 w-full">
      <Input
        sort="chat"
        onClick={() => {}}
        className="rounded-3xl bg-onepink px-4 text-darkgray border-none outline-none"
        onFocus={() => {}}
        onChange={(e) => onChangeInput(e)}
        onEnterPress={handleSendMessage}
        textValue={inputVal || ''}
        placeholder={CHAT_INPUT.MESSAGE}
      />
      <div className="absolute flex justify-center items-center right-[12%] top-[26%] bg-threepink h-[34px] w-[34px] rounded-full cursor-pointer">
        <Icons name={send} onClick={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatInputContainer
