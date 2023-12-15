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
    <section className="flex flex-col justify-center h-screen">
      <Header chat />
      <div className="relative bg-onepink h-full w-full ">
        <ChatPreviewContainer userId={Number(userId)} roomId={Number(roomId)} />
        <div className="absolute bottom-0 w-full">
          <Image src={imageSrc} alt="preview" width={296} height={298} />
        </div>
      </div>
    </section>
  )
}
