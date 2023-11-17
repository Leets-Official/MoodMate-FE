import ChatContainer from '@/_components/chat/containers/ChatContainer'
import ChatInputContainer from '@/_components/chat/containers/ChatInputContainer'
import ChatHeader from '@/_components/layout/ChatHeader'

export default function ChatRoomPage() {
  return (
    <section className="flex flex-col h-screen">
      <ChatHeader />
      <ChatContainer />
      <ChatInputContainer />
    </section>
  )
}
