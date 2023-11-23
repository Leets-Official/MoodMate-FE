import ChatItem from './ChatItem'

interface ChatListProps {
  userId: number
  chatHistory: ChatMessageGet[]
}

const ChatList = ({ userId, chatHistory }: ChatListProps) => {
  return (
    <>
      {chatHistory.map((chat, idx) => {
        return chat.senderId !== userId ? (
          <ChatItem
            key={chat.messageId}
            type="YOU"
            chat={chat}
            newSender={
              idx === 0 ||
              (idx > 0 && chatHistory[idx - 1].senderId !== chat.senderId)
            }
          />
        ) : (
          <ChatItem key={chat.messageId} type="ME" chat={chat} />
        )
      })}
    </>
  )
}

export default ChatList
