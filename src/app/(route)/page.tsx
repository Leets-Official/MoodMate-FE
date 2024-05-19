'use client'

import Loading from '@/_components/common/Loading'
import { getCookie } from '@/utils/cookieutils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Root() {
  const route = useRouter()
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    const refreshToken = getCookie('refreshToken')

    if ((accessToken || refreshToken) !== undefined) {
      route.push('/main')
    } else {
      route.push('/login')
    }
  }, [route])
  return (
    <main>
      <Loading />
    </main>
  )
}
