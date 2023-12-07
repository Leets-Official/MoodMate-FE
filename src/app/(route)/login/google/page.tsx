'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { router } from 'next/client'

const OauthPage = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const refreshTokenURL = new URL(window.location.href).searchParams.get(
        'refreshToken',
      )
      const accessTokenURL = new URL(window.location.href).searchParams.get(
        'accessToken',
      )
      const splitToken = accessTokenURL?.split('?')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setAccessToken(splitToken[0])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setRefreshToken(refreshTokenURL)
    }
  }, [accessToken, refreshToken])
  useEffect(() => {
    if (accessToken) {
      router.push('/main')
    }
  }, [accessToken])
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
