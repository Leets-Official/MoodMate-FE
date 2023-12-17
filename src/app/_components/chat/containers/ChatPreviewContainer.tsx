'use client'

import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE, UNMATCHED_MODAL } from '@/_constants/chat'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { openUnmatchModalState } from '@/_atom/chat'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'
import { useRouter } from 'next/navigation'
import ChatPreview from '../chatlist/ChatPreview'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { openUnmatchModalState } from '@/_atom/chat'
import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'
import { useRouter } from 'next/navigation'

interface ChatPreviewContainerProps {
  roomId: number
  userId: number
}

const ChatPreviewContainer = ({
  userId,
  roomId,
}: ChatPreviewContainerProps) => {
  const router = useRouter()
  const [openUnmatchModal, setOpenUnmatchedModal] = useRecoilState(
    openUnmatchModalState,
  )
  const { isLoading, isError, chatHistory } = useChatQuery(
    roomId,
    CHAT_SIZE.PREVIEW,
    1,
  )

  useEffect(() => {
    if (chatHistory && !chatHistory.user.roomActive) {
      setOpenUnmatchedModal(true)
    }
  }, [chatHistory])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <ErrorPage />
  }

  return (
    <section className="w-full h-full flex justify-center pt-[34px]">
      {chatHistory && (
        <ChatPreview
          roomId={roomId}
          userId={userId}
          nickname={chatHistory.user.nickname}
          count={1}
          lastMessage={
            chatHistory.chatList[0] ? chatHistory.chatList[0].content : null
          }
          isRead={
            chatHistory.chatList[0] ? chatHistory.chatList[0].isRead : null
          }
          gender={chatHistory.user.gender}
        />
      )}
      {openUnmatchModal && chatHistory && (
        <ModalPortal nodeName="unmatchedPortal">
          <ModalOutside
            onClose={() => {}}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[467px] px-10 rounded-[25px] shadow-sm py-10"
          >
            <ModalContentOne
              subject={UNMATCHED_MODAL}
              onClose={() => router.push('/main')}
              gender={chatHistory.user.gender}
            />
          </ModalOutside>
        </ModalPortal>
      )}
    </section>
  )
}

export default ChatPreviewContainer
