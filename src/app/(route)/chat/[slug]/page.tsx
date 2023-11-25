import ChatPreviewContainer from '@/_components/chat/containers/ChatPreviewContainer'
import Header from '@/_components/layout/Header'

export default function ChatPage({ params }: { params: { slug: string } }) {
  return (
    <section className="flex flex-col h-screen">
      <Header chat />
      <ChatPreviewContainer userId={Number(params.slug)} />
    </section>
  )
}
