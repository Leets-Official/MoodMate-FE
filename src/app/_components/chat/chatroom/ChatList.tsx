import { displayNewDate } from '@/utils/date'
import ChatItem from './ChatItem'
import ChatDate from './ChatDate'

interface ChatListProps {
  user?: SimpleUser
  userId: number
  chatHistory: ChatMessageFromServer[]
}

const ChatList = ({ userId, user, chatHistory }: ChatListProps) => {
  let prevDate: string | null = null
  return (
    <>
      {chatHistory.map((chat, idx) => {
        const messageDate = displayNewDate(chat.createdAt)
        let displayDate: boolean | null = null

        if (messageDate !== prevDate) {
          displayDate = true
          prevDate = messageDate
        }

        return (
          <>
            {displayDate && <ChatDate date={messageDate} />}
            {chat.userId !== userId ? (
              <ChatItem
                key={chat.messageId}
                type="YOU"
                chat={chat}
                user={user}
                newSender={
                  idx === 0 ||
                  (idx > 0 && chatHistory[idx - 1].userId !== chat.userId)
                }
              />
            ) : (
              <ChatItem
                key={chat.messageId}
                type="ME"
                chat={chat}
                user={user}
              />
            )}
          </>
        )
      })}
    </>
  )
}

export default ChatList
