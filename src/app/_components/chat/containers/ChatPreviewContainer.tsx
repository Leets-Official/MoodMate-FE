'use client'

import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE } from '@/_constants/chat'
import Loading from '@/_components/common/Loading'
import ErrorPage from '@/(route)/error'
import ChatPreview from '../chatlist/ChatPreview'

interface ChatPreviewContainerProps {
  roomId: number
  userId: number
}

const ChatPreviewContainer = ({
  userId,
  roomId,
}: ChatPreviewContainerProps) => {
  const { isLoading, isError, chatHistory } = useChatQuery(
    roomId,
    CHAT_SIZE.PREVIEW,
    1,
  )

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
    </section>
  )
}

export default ChatPreviewContainer
