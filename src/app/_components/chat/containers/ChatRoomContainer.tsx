'use client'

import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import ChatList from '../chatroom/ChatList'

interface ChatRoomContainerProps {
  userId: number
  roomId: number
}

const ChatRoomContainer = ({ userId, roomId }: ChatRoomContainerProps) => {
  const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [fetchedChatData, setFetchedChatData] = useState<
    ChatMessageFromServer[] | null
  >(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { fetchNextPage, hasNextPage, data } = useInfiniteChatQuery(
    userId,
    roomId,
    CHAT_SIZE.ROOM,
  )

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [realTimeMessages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
    console.log(data?.pages)

    if (data) {
      const newData = data.pages.flatMap((pageData) => pageData.chatList)
      setFetchedChatData((prevData) => prevData && prevData.concat(newData))
    }
  }, [data])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target === topDivRef.current &&
          hasNextPage
        ) {
          console.log('Intersection observed. Fetching next page...')

          fetchNextPage()
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    })

    if (containerRef.current && topDivRef.current) {
      observer.observe(topDivRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasNextPage, fetchNextPage])

  return (
    <div className="h-[82%] py-5 px-3 ">
      <div className="h-full overflow-scroll scrollbar-hide" ref={containerRef}>
        <div ref={topDivRef}></div>
        {data?.pages.map((pageData) => (
          <ChatList
            key={pageData.pageable.page}
            userId={userId}
            user={pageData.user}
            chatHistory={fetchedChatData || pageData.chatList}
          />
        ))}
        <ChatList
          userId={userId}
          user={data?.pages[0].user}
          chatHistory={realTimeMessages}
        />
      </div>
    </div>
  )
}

export default ChatRoomContainer
