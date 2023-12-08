'use client'

import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import { useIntersectionObserver } from '@/_hooks/useIntersectionObserver'
import ChatList from '../chatroom/ChatList'

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
  const { fetchNextPage, hasNextPage, data, isFetchingNextPage } =
    useInfiniteChatQuery(userId, roomId, CHAT_SIZE.ROOM)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
    console.log('new messages : ', realTimeMessages)
  }, [realTimeMessages])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    if (topDivRef.current && hasNextPage && !isFetchingNextPage) {
      observer.observe(topDivRef.current)
    }

    if (!hasNextPage && topDivRef.current) {
      observer.unobserve(topDivRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [userId, hasNextPage, isFetchingNextPage, fetchNextPage])

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
    <section className="h-[82%] py-5 px-3 overflow-scroll" ref={scrollRef}>
      <div ref={topDivRef} />
      {isFetchingNextPage ? (
        <p>로딩중...</p> // 로딩 처리
      ) : (
        !hasNextPage && <p>처음 채팅!</p>
      )}
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
      <ChatList userId={userId} chatHistory={realTimeMessages} />
    </section>
  )
}

export default ChatRoomContainer
