'use client'

import ChatList from '../chatroom/ChatList'
import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'

interface ChatRoomContainerProps {
  userId: number
}

var example = {
  userId: 1,
  chatList: [
    {
      messageId: 1,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 2,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 3,
      content: 'hi',
      senderId: 2,
      sendTime: '2023-01-01T00:10:00Z',
      isRead: 1,
    },
    {
      messageId: 4,
      content:
        '안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 5,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 0,
    },
  ],
}

const ChatRoomContainer = ({ userId }: ChatRoomContainerProps) => {
  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { isLoading, isError, chatHistory, isSuccess } = useChatQuery(
    userId,
    CHAT_SIZE.ROOM,
    1,
  )
  useEffect(() => {
    if (isSuccess && chatHistory) {
      setRealTimeMessages(chatHistory.chatList)
    }
    console.log(realTimeMessages)
  }, [isSuccess])

  return (
    <section className="h-[82%] py-5 px-3">
      {/* <ChatList userId={userId} chatHistory={chatHistory} /> */}
      <ChatList userId={userId} chatHistory={example.chatList} />
    </section>
  )
}

export default ChatRoomContainer
