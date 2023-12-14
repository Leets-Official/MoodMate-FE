import ChatPreviewContainer from '@/_components/chat/containers/ChatPreviewContainer'
import Header from '@/_components/layout/Header'
import Image, { StaticImageData } from 'next/image'

interface ChatPageProps {
  params: {
    slug: string[]
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const [userId, roomId] = params.slug
  const imageSrc = require(
    `/public/illustration/common/chat/chatlist.png`,
  ) as StaticImageData

  return (
    <section className="flex flex-col h-screen">
      <Header chat />
      <ChatPreviewContainer userId={Number(userId)} roomId={Number(roomId)} />
      <Image src={imageSrc} alt="preview" width={296} height={298} />
    </section>
  )
}
