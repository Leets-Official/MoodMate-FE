'use client'

import Loading from '@/_components/common/Loading'

import { useEffect } from 'react'
import { getCookie } from '@/utils/cookieutils'
import { useRouter } from 'next/navigation'

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
    // throw Error 서비스 종료 시 코드
  }, [route])
  return (
    <main>
      <Loading />
    </main>
  )
}
