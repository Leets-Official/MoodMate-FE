import ChatInputContainer from '@/_components/chat/containers/ChatInputContainer'
import ChatRoomContainer from '@/_components/chat/containers/ChatRoomContainer'
import ChatHeader from '@/_components/layout/ChatHeader'

interface ChatRoomPageProps {
  params: {
    slug: string[]
  }
}

export default function ChatRoomPage({ params }: ChatRoomPageProps) {
  const [userId, roomId] = params.slug

  return (
    <section className="flex flex-col h-screen">
      <ChatHeader userId={Number(userId)} />
      <ChatRoomContainer userId={Number(userId)} />
      <ChatInputContainer roomId={Number(roomId)} />
    </section>
  )
}
