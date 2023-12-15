'use client'

import { CHAT_SIZE, UNMATCHED_MODAL } from '@/_constants/chat'
import { useRecoilState } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import ChatList from '../chatroom/ChatList'
import { useRouter } from 'next/navigation'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'

interface ChatRoomContainerProps {
  userId: number
  roomId: number
}

const ChatRoomContainer = ({ userId, roomId }: ChatRoomContainerProps) => {
  const router = useRouter()
  const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [realTimeMessages, setRealTimeMessages] = useRecoilState(
    realTimeMessagesState,
  )
  const [openUnmatchModal, setOpenUnmatchedModal] = useState<boolean>(false)
  const { fetchNextPage, hasNextPage, data, isError, isLoading } =
    useInfiniteChatQuery(userId, roomId, CHAT_SIZE.ROOM)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [realTimeMessages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
    // if (data?.pages[0].user && data?.pages[0].user.roomActive) {
    //   setOpenUnmatchedModal(true)
    // }
  }, [data])

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target === topDivRef.current &&
          hasNextPage
        ) {
          setTimeout(() => {
            fetchNextPage()
          }, 300)
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

  useEffect(() => {
    if (!containerRef) return

    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollHeight - scrollHeight
      containerRef.current.scrollTop = scrollTop
      setScrollHeight(containerRef.current.scrollHeight)
    }
  }, [data?.pages.length])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !data) {
    return <ErrorPage />
  }

  return (
    <div className="w-full bg-white h-screen">
      <div
        className="items-center mt-[80px] w-[95%] h-[76%] bg-black overflow-scroll scrollbar-hide"
        ref={containerRef}
      >
        <div ref={topDivRef} />
        {data?.pages
          .slice()
          .reverse()
          .map((chatData) => (
            <ChatList
              key={chatData.pageable.page}
              userId={userId}
              user={chatData.user}
              chatHistory={chatData.chatList}
            />
          ))}
        {data && (
          <ChatList
            userId={userId}
            user={data.pages[0].user}
            chatHistory={realTimeMessages}
          />
        )}
      </div>
      {/* 동작 확인하기 ** */}
      {openUnmatchModal && data && (
        <ModalPortal nodeName="unmatchedPortal">
          <ModalOutside
            onClose={() => {}}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContentOne
              subject={UNMATCHED_MODAL}
              onClose={() => router.push('/main')}
              gender={data.pages[0].user.gender}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </div>
  )
}

export default ChatRoomContainer
