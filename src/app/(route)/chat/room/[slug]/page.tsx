import ChatInputContainer from '@/_components/chat/containers/ChatInputContainer'
import ChatRoomContainer from '@/_components/chat/containers/ChatRoomContainer'
import ChatHeader from '@/_components/layout/ChatHeader'

export default function ChatRoomPage({ params }: { params: { slug: string } }) {
  return (
    <section className="flex flex-col h-screen">
      <ChatHeader userId={Number(params.slug)} />
      <ChatRoomContainer userId={Number(params.slug)} />
      <ChatInputContainer />
    </section>
  )
}
