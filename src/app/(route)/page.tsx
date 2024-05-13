'use client'

import Loading from '@/_components/common/Loading'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Root() {
  const route = useRouter()
  useEffect(() => {
    route.push('/main')
  }, [route])
  return (
    <main>
      <Loading />
    </main>
  )
}
