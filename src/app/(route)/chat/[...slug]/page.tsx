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
  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const imageSrc = require(
    `/public/illustration/common/chat/chatlist.png`,
  ) as StaticImageData

  return (
    <section className="relative flex flex-col bg-onepink justify-between h-screen">
      <Header chat />
      <div className="relative h-[100%] w-full ">
        <ChatPreviewContainer userId={Number(userId)} roomId={Number(roomId)} />
        <div className="flex justify-center items-center absolute bottom-20 w-full">
          <Image src={imageSrc} alt="preview" width={320} height={330} />
        </div>
      </div>
    </section>
  )
}
