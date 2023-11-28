import { useRouter } from 'next/router'
import NormalButton from '@/_components/common/NormalButton'

interface MyinfoPageProps {
  params: {
    slug: string
  }
}

export default function MyinfoPage({ params }: MyinfoPageProps) {
  const pageNumber = params.slug

  return <section>MyinfoPage</section>
}
