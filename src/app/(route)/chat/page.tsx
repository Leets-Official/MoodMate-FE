import ChatContainer from '@/_components/chat/containers/ChatContainer'
import ChatInputContainer from '@/_components/chat/containers/ChatInputContainer'

export default function ChatPage() {
  return (
    <section className="flex flex-col h-screen">
      <ChatContainer />
      <ChatInputContainer />
    </section>
  )
}
