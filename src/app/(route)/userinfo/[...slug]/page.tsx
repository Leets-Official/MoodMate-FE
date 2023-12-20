'use client'

import Error from '@/(route)/error'
import UserinfoPageComponents from '@/_components/common/userinfo/UserinfoPageComponents'
import { useMainQuery } from '@/_hooks/useMainQuery'
import { useRouter } from 'next/navigation'

interface UserinfoPageProps {
  params: {
    slug: string
  }
}

export default function UserinfoPage({ params }: UserinfoPageProps) {
  const pageNumber = params.slug
  const { isError, data } = useMainQuery()
  const router = useRouter()
  if (isError) {
    return <Error />
  }
  if (
    data?.mainPageResponse.userGender == 'MALE' ||
    data?.mainPageResponse.userGender == 'FEMALE'
  ) {
    router.push('/main')
  }
  return (
    <section className="flex items-center justify-center">
      <UserinfoPageComponents slug={pageNumber} />
    </section>
  )
}
