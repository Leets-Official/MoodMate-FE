'use client'

import { ChangeEvent, useState } from 'react'
import Icons from '@/_components/common/Icons'
import { send } from '@/_ui/IconsPath'
import Input from '../../common/Input'
import { useRecoilState } from 'recoil'
import useWebsocket from '@/_hooks/useWebSocket'
import { realTimeMessagesState } from '@/_atom/chat'

interface ChatInputContainerProps {
  roomId: number
}

const ChatInputContainer = ({ roomId }: ChatInputContainerProps) => {
  const [inputVal, setInputVal] = useState<string>('')
  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { sendMessage } = useWebsocket(roomId)

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(() => e.target.value)
  }

  const handleSendMessage = () => {
    const messageTosend = {
      roomId: 1,
      userId: 1,
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
