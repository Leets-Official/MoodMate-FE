'use client'

import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState, useSetRecoilState } from 'recoil'
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
  // const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  // const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const { fetchNextPage, hasNextPage, data } = useInfiniteChatQuery(
    userId,
    roomId,
    CHAT_SIZE.ROOM,
  )

  const handleScroll = () => {
    const ref = containerRef.current!
    if (Math.abs(ref.scrollTop) < 100 && hasNextPage) {
      fetchNextPage()
    }
    // if (ref.scrollTop < -50) {
    //   // 스크롤이 맨 아래가 아닌 경우 프리뷰 표시
    // }
    // if (ref.scrollTop > -10) {
    //   // 스크롤이 맨 아래인 경우 프리뷰 제거
    // }
  }

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.addEventListener('scroll', handleScroll)
    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  //가장 처음 스크롤을 맨 아래로 내린 상태로 렌더링 로직 추가

  useEffect(() => {
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

// useIntersectionObserver(
//   scrollRef,
//   (entries: IntersectionObserverEntry[]) => {
//     entries.forEach((entry) => {
//       if (
//         entry.isIntersecting &&
//         scrollRef.current &&
//         scrollRef.current.scrollTop === 0 &&
//         hasNextPage
//       ) {
//         fetchNextPage()
//       }
//     })
//   },
//   hasNextPage,
// )
