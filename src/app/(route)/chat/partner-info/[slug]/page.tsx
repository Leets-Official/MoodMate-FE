import ChatPartnerInfoContainer from '@/_components/chat/containers/ChatPartnerInfoContainer'

interface PartnerInfoPageProps {
  params: {
    slug: string
  }
}

export default function PartnerInfoPage({ params }: PartnerInfoPageProps) {
  return (
    <div>
      <ChatPartnerInfoContainer userId={Number(params.slug)} />
    </div>
  )
}
