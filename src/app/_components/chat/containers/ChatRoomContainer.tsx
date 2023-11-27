'use client'

import ChatList from '../chatroom/ChatList'
import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'
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
      userId: 1,
      createdAt: '2023-01-01T00:01:00Z',
      isRead: true,
    },
    {
      messageId: 2,
      content: 'hello',
      userId: 1,
      createdAt: '2023-01-01T00:02:00Z',
      isRead: true,
    },
    {
      messageId: 3,
      content: 'hi',
      userId: 2,
      createdAt: '2023-01-02T00:10:00Z',
      isRead: true,
    },
    {
      messageId: 4,
      content:
        '안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕',
      userId: 1,
      createdAt: '2023-01-02T00:11:00Z',
      isRead: true,
    },
    {
      messageId: 5,
      content: 'hello',
      userId: 1,
      createdAt: '2023-01-02T00:19:00Z',
      isRead: false,
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
    1, //page -> 무한스크롤
  )
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [realTimeMessages])

  console.log(realTimeMessages)

  return (
    <section className="h-[82%] py-5 px-3 overflow-scroll" ref={scrollRef}>
      {/* <ChatList userId={userId} chatHistory={chatHistory} /> */}
      <ChatList userId={userId} chatHistory={example.chatList} />
      <ChatList userId={userId} chatHistory={realTimeMessages} />
    </section>
  )
}

export default ChatRoomContainer
