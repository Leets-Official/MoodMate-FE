'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Loading from '@/_components/common/Loading'
import { useMainQuery } from '@/_hooks/useMainQuery'

const OauthPage = () => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const router = useRouter()
  const { isLoading, isError, data } = useMainQuery()
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  const { userGender } = data.mainPageResponse
  console.log('1d2', userGender)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessTokenURL = new URL(window.location.href).searchParams.get(
        'accessToken',
      )
      const refreshTokenURL = new URL(window.location.href).searchParams.get(
        'refreshToken',
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (userGender === 'male' || userGender === 'female') {
      Cookies.set('realAccessToken', accessToken)
      Cookies.set('realRefreshToken', refreshToken)
      router.push('/main')
    } else if (userGender === null) {
      Cookies.set('realAccessToken', accessToken)
      Cookies.set('realRefreshToken', refreshToken)
      router.push('/userinfo/1')
    }
  }, [accessToken, refreshToken, router, userGender])
  return (
    <div>
      <Loading />
    </div>
  )
}

export default OauthPage
