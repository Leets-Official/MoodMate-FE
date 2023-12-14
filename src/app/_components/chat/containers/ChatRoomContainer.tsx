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
  const [scrollHeight, setScrollHeight] = useState(0)

  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { fetchNextPage, hasNextPage, data, isFetchingNextPage } =
    useInfiniteChatQuery(userId, roomId, CHAT_SIZE.ROOM)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [realTimeMessages])

  useEffect(() => {
    setTimeout(() => {
      console.log('ㄱㄷ')
      if (containerRef.current) {
        // containerRef.current.scrollTop = containerRef.current.scrollHeight
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
      }
    }, 1500)
  }, [data])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          containerRef.current &&
          containerRef.current.scrollTop === 0 &&
          hasNextPage &&
          !isFetchingNextPage
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

    if (
      topDivRef.current &&
      topDivRef.current.scrollHeight - topDivRef.current.scrollTop ===
        topDivRef.current.clientHeight &&
      hasNextPage
    ) {
      console.log('scrollHeight', topDivRef.current.scrollHeight)
      console.log('scrollTop', topDivRef.current.scrollTop)
      console.log('clientHeight', topDivRef.current.clientHeight)
      observer.observe(containerRef.current!)
    }

    return () => {
      observer.disconnect()
    }
  }, [userId, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="h-[82%] py-5 px-3 ">
      <div className="h-full overflow-scroll scrollbar-hide" ref={containerRef}>
        <div ref={topDivRef}></div>
        {data?.pages.map((pageData) => (
          <ChatList
            key={pageData.pageable.page}
            userId={userId}
            user={pageData.user}
            chatHistory={pageData.chatList}
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

// useEffect(() => {
//   const handleScroll = () => {
//     const container = containerRef.current
//     if (container && container.scrollTop === 0 && hasNextPage) {
//       fetchNextPage()
//     }
//   }

//   if (containerRef.current) {
//     containerRef.current.addEventListener('scroll', handleScroll)
//   }

//   return () => {
//     if (containerRef.current) {
//       containerRef.current.removeEventListener('scroll', handleScroll)
//     }
//   }
// }, [])

// useEffect(() => {
//   if (containerRef.current) {
//     const scrollTop = containerRef.current.scrollHeight - scrollHeight
//     containerRef.current.scrollTop = scrollTop
//     setScrollHeight(containerRef.current.scrollHeight)
//   }
//   console.log(data?.pages)
// }, [data?.pages, scrollHeight])
