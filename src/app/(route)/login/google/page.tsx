'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const OauthPage = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessTokenURL = new URL(window.location.href).searchParams.get(
        'accessToken',
      )
      const refreshTokenURL = new URL(window.location.href).searchParams.get(
        'refreshToken',
      )
      const splitToken = accessTokenURL?.split('?')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAccessToken(splitToken[0])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setRefreshToken(splitToken[1])
      const splitRefresh = refreshToken.split('=')
      setRefreshToken(splitRefresh[1])
      // router.push('/main')
    }
  }, [accessToken, refreshToken])
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
