'use client'

import Loading from '@/_components/common/Loading'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function Root() {
  const route = useRouter()
  const accessToken = Cookies.get('accessToken')
  if (accessToken) {
    route.push('/main')
  } else {
    route.push('/login')
  }
  return (
    <main>
      <Loading />
    </main>
  )
}
