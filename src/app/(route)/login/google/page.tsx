'use client'

import { useLoginQuery } from '@/_hooks/useLoginQuery'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const OauthPage = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const { isLoading, isError } = useLoginQuery()
  const [token, setToken] = useState<string>('')
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { accessToken, refreshToken } = router.query

    if (accessToken && refreshToken) {
      setAccessToken(accessToken as string)
      setRefreshToken(refreshToken as string)
    }
  }, [router.query])
  return (
    <div>
      <p>Access Token: {accessToken}</p>
      <p>Refresh Token: {refreshToken}</p>
    </div>
  )
}

export default OauthPage
