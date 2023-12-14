'use client'

import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import { useIntersectionObserver } from '@/_hooks/useIntersectionObserver'
import ChatList from '../chatroom/ChatList'
import { fsyncSync } from 'fs'

interface ChatRoomContainerProps {
  userId: number
  roomId: number
}
const ChatRoomContainer = ({ userId, roomId }: ChatRoomContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { fetchNextPage, hasNextPage, data } = useInfiniteChatQuery(
    userId,
    roomId,
    CHAT_SIZE.ROOM,
  )

  useIntersectionObserver(
    scrollRef,
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          scrollRef.current &&
          scrollRef.current.scrollTop === 0 &&
          hasNextPage
        ) {
          fetchNextPage()
        }
      })
    },
    hasNextPage,
  )

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [realTimeMessages])

  useEffect(() => {
    if (!containerRef) return

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollHeight - scrollHeight
      containerRef.current.scrollTop = scrollTop
      setScrollHeight(containerRef.current.scrollHeight)
    }
    console.log(data?.pages)
  }, [data?.pages, scrollHeight])

  return (
    <section
      className="h-[82%] py-5 px-3 overflow-scroll scrollbar-hide"
      ref={containerRef}
    >
      <div ref={topDivRef} />
      {data?.pages.map((pageData) => {
        return (
          <ChatList
            key={pageData.pageable.page}
            userId={userId}
            user={pageData.user}
            chatHistory={pageData.chatList}
          />
        )
      })}
      <ChatList
        userId={userId}
        user={data?.pages[0].user}
        chatHistory={realTimeMessages}
      />
    </section>
  )
}

export default ChatRoomContainer
