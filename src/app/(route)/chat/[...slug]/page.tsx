import ChatPreviewContainer from '@/_components/chat/containers/ChatPreviewContainer'
import Header from '@/_components/layout/Header'

interface ChatPageProps {
  params: {
    slug: string[]
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const [userId, roomId] = params.slug

  return (
    <section className="flex flex-col h-screen">
      <Header chat />
      <ChatPreviewContainer userId={Number(userId)} roomId={Number(roomId)} />
    </section>
  )
}
