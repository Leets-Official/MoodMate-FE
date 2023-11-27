'use client'

import ChatList from '../chatroom/ChatList'
import { CHAT_SIZE } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import { useIntersectionObserver } from '@/_hooks/useIntersectionObserver'
import { data } from 'autoprefixer'

interface ChatRoomContainerProps {
  userId: number
}

// var example = {
//   chatList: [
//     {
//       messageId: 1,
//       content: 'hello',
//       userId: 1,
//       createdAt: '2023-01-01T00:01:00Z',
//       isRead: true,
//     },
//     {
//       messageId: 4,
//       content:
//         '안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕안뇽하세요안녕',
//       userId: 1,
//       createdAt: '2023-01-02T00:11:00Z',
//       isRead: true,
//     },
//     {
//       messageId: 5,
//       content: 'hello',
//       userId: 1,
//       createdAt: '2023-01-02T00:19:00Z',
//       isRead: false,
//     },
//   ],
// }

const ChatRoomContainer = ({ userId }: ChatRoomContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const {
    fetchNextPage,
    hasNextPage,
    data, // 형태 맞는지 재확인
    isFetchingNextPage,
    status,
  } = useInfiniteChatQuery(userId, CHAT_SIZE.ROOM)

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    })
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
    console.log(realTimeMessages)
  }, [realTimeMessages])

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) =>
      handleIntersection(entries)

    useIntersectionObserver(topDivRef, observerCallback, hasNextPage)
  }, [userId, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    if (!containerRef) return

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollHeight - scrollHeight
      containerRef.current.scrollTop = scrollTop
      setScrollHeight(containerRef.current.scrollHeight)
    }
    console.log(data) //콘솔 확인
  }, [data]) // deps맞는지 확인.

  return (
    <section className="h-[82%] py-5 px-3 overflow-scroll" ref={scrollRef}>
      <div ref={topDivRef} />
      {status === 'error' ? (
        <p>error</p> // 에러처리
      ) : (
        <>
          {isFetchingNextPage ? (
            <p>로딩중...</p> // 로딩 처리
          ) : (
            !hasNextPage && <p>처음 채팅!</p>
          )}
          {data?.pages.map((pageData) => {
            return (
              <ChatList
                userId={userId}
                user={pageData.user}
                chatHistory={pageData.chatList}
              />
            )
          })}
          {/* <ChatList userId={userId} chatHistory={example.chatList} /> */}
          <ChatList userId={userId} chatHistory={realTimeMessages} />
        </>
      )}
    </section>
  )
}

export default ChatRoomContainer
