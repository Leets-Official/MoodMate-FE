'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const OauthPage = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refreshTokenURL = new URL(window.location.href).searchParams.get('refreshToken')
      const accessTokenURL = new URL(window.location.href).searchParams.get('accessToken')
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
    if (accessToken) {
      router.push('/main')
    }
  }, [accessToken, router])
  Cookies.set('realAccessToken', accessToken)
  Cookies.set('realRefreshToken', refreshToken)
  return (
    <div>
      <p>Access Token: {accessToken}</p>
      <p>Refresh Token: {refreshToken}</p>
    </div>
  )
}

export default OauthPage
