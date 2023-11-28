'use client'

import { useChatQuery } from '@/_hooks/useChatQuery'
import ChatPreview from '../chatlist/ChatPreview'
import { CHAT_SIZE } from '@/_constants/chat'

interface ChatPreviewContainerProps {
  roomId: number
  userId: number
}

const ChatPreviewContainer = ({
  userId,
  roomId,
}: ChatPreviewContainerProps) => {
  const { isLoading, isError, chatHistory } = useChatQuery(
    userId,
    roomId,
    CHAT_SIZE.PREVIEW,
    1,
  )
  return (
    <section className="bg-neutral-300 w-full h-full flex justify-center pt-[34px]">
      {chatHistory && (
        <ChatPreview
          roomId={roomId}
          userId={userId}
          nickname={chatHistory.user.nickname}
          count={1} // 추가 수정 필요
          lastMessage={chatHistory.chatList[0].content}
          isRead={chatHistory.chatList[0].isRead}
          gender={chatHistory.user.gender}
        />
      )}
    </section>
  )
}

export default ChatPreviewContainer
