import ChatPartnerInfoContainer from '@/_components/chat/containers/ChatPartnerInfoContainer'

interface PartnerInfoPageProps {
  params: {
    slug: string
  }
}

export default function PartnerInfoPage({
  params: slug,
}: PartnerInfoPageProps) {
  return (
    <div>
      <ChatPartnerInfoContainer userId={Number(slug)} />
    </div>
  )
}
