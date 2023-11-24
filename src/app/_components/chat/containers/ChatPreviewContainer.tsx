import { useChatQuery } from '@/_hooks/useChatQuery'
import ChatPreview from '../chatlist/ChatPreview'
import { CHAT_SIZE } from '@/_constants/chat'

interface ChatPreviewContainerProps {
  userId: number
}

const ChatPreviewContainer = ({ userId }: ChatPreviewContainerProps) => {
  const { isLoading, isError, chatHistory, isSuccess } = useChatQuery(
    userId,
    CHAT_SIZE.PREVIEW,
    1,
  )
  return (
    <section className="bg-neutral-300 w-full h-full flex justify-center pt-[34px]">
      <ChatPreview
        userId={userId}
        nickname="사랑스러운 무디"
        count={1}
        lastMessage="안녕하세요. 저랑 취향이 비슷 저랑 취향이 비슷 저랑 취향이 비슷하시네요. 저도 강아지
          좋아해요~"
        isRead={false}
      />
    </section>
  )
}

export default ChatPreviewContainer
