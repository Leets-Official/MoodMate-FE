'use client'

import { CHAT_SIZE, UNMATCHED_MODAL } from '@/_constants/chat'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect, useRef, useState } from 'react'
import { openUnmatchModalState, realTimeMessagesState } from '@/_atom/chat'
import { useInfiniteChatQuery } from '@/_hooks/useInfiniteChatQuery'
import { useRouter } from 'next/navigation'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'
import ChatList from '../chatroom/ChatList'
import dynamic from 'next/dynamic'

interface ChatRoomContainerProps {
  userId: number
  roomId: number
}

const ModalContentOne = dynamic(
  () => import('@/_components/common/modal/ModalContentOne'),
  {
    suspense: true,
  },
)

const ChatRoomContainer = ({ userId, roomId }: ChatRoomContainerProps) => {
  const router = useRouter()
  const topDivRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const realTimeMessages = useRecoilValue(realTimeMessagesState)
  const [scrollHeight, setScrollHeight] = useState(0)
  const [openUnmatchModal, setOpenUnmatchedModal] = useRecoilState(
    openUnmatchModalState,
  )
  const { fetchNextPage, hasNextPage, data, isError, isLoading } =
    useInfiniteChatQuery(userId, roomId, CHAT_SIZE.ROOM)

  useEffect(() => {
    const handleFocus = () => {
      window.location.reload()
    }

    window.addEventListener('focus', handleFocus)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [realTimeMessages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
    if (data?.pages[0].user && !data?.pages[0].user.roomActive) {
      setOpenUnmatchedModal(true)
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
    return (
      <div className="bg-yellow w-full h-full">
        <Loading />
      </div>
    )
  }

  if (isError || !data) {
    return <ErrorPage />
  }

  return (
    <div className="w-full bg-yellow h-screen  ">
      <div
        className="items-center w-full px-3 h-[82%] mt-[35px] overflow-scroll scrollbar-hide  "
        ref={containerRef}
      >
        <div ref={topDivRef} />
        {data.pages
          .slice()
          .reverse()
          .map((chatData) => (
            <ChatList
              key={chatData.pageable.page}
              userId={userId}
              user={chatData.user}
              chatHistory={chatData.chatList.slice().reverse()}
            />
          ))}
        {data && data.pages[0].chatList.length === 0 && (
          <div className="w-full text-center mb-5 text-xs text-[#B0B0B0] mt-[40px]">
            무디와의 설레는 채팅을 시작해보세요!
          </div>
        )}
        <ChatList
          userId={userId}
          user={data.pages[0].user}
          chatHistory={realTimeMessages}
        />
      </div>
      {openUnmatchModal && data && (
        <ModalPortal nodeName="unmatchedPortal">
          <ModalOutside
            onClose={() => {}}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-10 rounded-[25px] shadow-sm py-10"
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
