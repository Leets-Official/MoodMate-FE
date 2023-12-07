'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Loading from '@/_components/common/Loading'

const OauthPage = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refreshTokenURL = new URL(window.location.href).searchParams.get(
        'refreshToken',
      )
      const accessTokenURL = new URL(window.location.href).searchParams.get(
        'accessToken',
      )
      const splitToken = accessTokenURL?.split('?')

      if (splitToken && splitToken.length > 0) {
        setAccessToken(splitToken[0])
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setRefreshToken(refreshTokenURL)
    }
  }, [])
  useEffect(() => {
    if (accessToken && refreshToken) {
      router.push('/main')
    }
  }, [accessToken, router])
  Cookies.set('realAccessToken', accessToken, {
    maxAge: 3 * 60 * 60,
    path: '/',
  })
  Cookies.set('realRefreshToken', refreshToken, {
    maxAge: 3 * 24 * 60 * 60,
    path: '/',
  })
  return (
    <div>
      <Loading />
    </div>
  )
}

export default OauthPage
