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
  const [fetchedChatData, setFetchedChatData] = useState<ResponseChatGet[]>([])
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

    if (data) {
      const newData = data.pages.flatMap((pageData) => pageData)
      if (data.pages[0].pageable.page === 0) {
        setFetchedChatData(data.pages)
      } else {
        setTimeout(() => {
          setFetchedChatData((prevData) => [...newData, ...prevData])
        }, 650)
      }
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
        {fetchedChatData.map((chatData) => (
          <ChatList
            key={chatData.pageable.page}
            userId={userId}
            user={chatData.user}
            chatHistory={chatData.chatList}
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
