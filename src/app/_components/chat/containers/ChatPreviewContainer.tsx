'use client'

import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE } from '@/_constants/chat'
import ChatPreview from '../chatlist/ChatPreview'
import Image, { StaticImageData } from 'next/image'

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
  const imageSrc = require(
    `/public/illustration/common/chat/chatlist.png`,
  ) as StaticImageData

  return (
    <section className="bg-onepink w-full h-full flex justify-center pt-[34px]">
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
      <Image src={imageSrc} alt="preview" width={296} height={298} />
    </section>
  )
}

export default ChatPreviewContainer
