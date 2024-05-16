'use client'

import ModalPortal from '@/_components/common/modal/ModalPortal'
import ModalOutside from '@/_components/common/modal/ModalOutside'
import ModalContentOne from '@/_components/common/modal/ModalContentOne'
import ChatPreview from '../chatlist/ChatPreview'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'
import Error from '@/(route)/error'

import { CHAT_SIZE, UNMATCHED_MODAL } from '@/_constants/chat'
import { useChatQuery } from '@/_hooks/useChatQuery'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { openUnmatchModalState } from '@/_atom/chat'

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
    return (
      <div className="w-full h-full">
        <ErrorPage />
      </div>
    )
  }
  if (isError || !chatHistory) {
    return <Error />
  }

  return (
    <section className="w-full h-screen bg-yellow flex justify-center pt-[34px] ">
      <ChatPreview
        roomId={roomId}
        userId={userId}
        nickname={chatHistory.user.nickname}
        count={1}
        lastMessage={
          chatHistory.chatList[0] ? chatHistory.chatList[0].content : null
        }
        isRead={chatHistory.chatList[0] ? chatHistory.chatList[0].isRead : null}
        gender={chatHistory.user.gender}
      />
      {openUnmatchModal && (
        <ModalPortal nodeName="unmatchedPortal">
          <ModalOutside
            onClose={() => {}}
            className="max-w-md scroll overflow-hidden bg-white w-[260px] h-[400px] px-10 rounded-[25px] shadow-sm py-10"
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
