'use client'

import ChatList from '../chatroom/ChatList'
import { useChatQuery } from '@/_hooks/useChatQuery'
import { CHAT_SIZE } from '@/_constants/chat'
import { MyChatListState } from '@/_atom/chat'
import { useRecoilState } from 'recoil'

interface ChatRoomContainerProps {
  userId: number
}

var example = {
  userId: 1,
  chatList: [
    {
      messageId: 1,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 2,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 3,
      content: 'hi',
      senderId: 2,
      sendTime: '2023-01-01T00:10:00Z',
      isRead: 1,
    },
    {
      messageId: 4,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
    {
      messageId: 5,
      content: 'hello',
      senderId: 1,
      sendTime: '2023-01-01T00:00:00Z',
      isRead: 1,
    },
  ],
}

const ChatRoomContainer = ({ userId }: ChatRoomContainerProps) => {
  const [myChatList, setMyChatList] = useRecoilState(MyChatListState)
  // const { isLoading, isError, chatHistory, isSuccess } = useChatQuery(
  //   userId,
  //   CHAT_SIZE.ROOM,
  //   1, <-- 페이지네이션
  // )
  return (
    <section className="h-[82%] py-5 px-3">
      {/* <ChatList chatHistory={chatHistory} /> */}
      <ChatList userId={userId} chatHistory={example.chatList} />
    </section>
  )
}

export default ChatRoomContainer
