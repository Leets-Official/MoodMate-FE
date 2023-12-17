'use client'

import Loading from '@/_components/common/Loading'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Root() {
  const route = useRouter()
  const accessToken = Cookies.get('accessToken')
  useEffect(() => {
    if (accessToken) {
      route.push('/main')
    } else {
      route.push('/login')
    }
  }, [accessToken, route])
  return (
    <main>
      <Loading />
    </main>
  )
}
