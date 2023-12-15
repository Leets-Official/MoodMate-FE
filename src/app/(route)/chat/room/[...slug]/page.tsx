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
    <section className="relative flex flex-col justify-center items-center w-full overflow-hidden">
      <ChatHeader userId={Number(userId)} />
      <ChatRoomContainer userId={Number(userId)} roomId={Number(roomId)} />
      <ChatInputContainer userId={Number(userId)} roomId={Number(roomId)} />
    </section>
  )
}
