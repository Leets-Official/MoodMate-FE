import { displayNewDate } from '@/utils/date'
import ChatItem from './ChatItem'
import ChatDate from './ChatDate'

interface ChatListProps {
  userId: number
  chatHistory: ChatMessageFromServer[] | ChatMessageFromServer[]
}

const ChatList = ({ userId, chatHistory }: ChatListProps) => {
  let prevDate: string | null = null
  return (
    <>
      {chatHistory.map((chat, idx) => {
        const messageDate = displayNewDate(chat.createdAt)
        let displayDate: boolean | null = null

        if (messageDate !== prevDate) {
          console.log(messageDate, '----', prevDate)
          displayDate = true
          prevDate = messageDate
        }
        return (
          <>
            {displayDate && <ChatDate date={messageDate} />}
            {chat.userId !== userId ? (
              <>
                <ChatItem
                  key={idx}
                  type="YOU"
                  chat={chat}
                  newSender={
                    idx === 0 ||
                    (idx > 0 && chatHistory[idx - 1].userId !== chat.userId)
                  }
                />
              </>
            ) : (
              <ChatItem key={idx} type="ME" chat={chat} />
            )}
          </>
        )
      })}
    </>
  )
}

export default ChatList
