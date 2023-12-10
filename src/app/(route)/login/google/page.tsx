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
  // useEffect(() => {
  //   if (accessToken) {
  //     router.push('/main')
  //   }
  // }, [accessToken, router])
  Cookies.set('realAccessToken', accessToken)
  Cookies.set('realRefreshToken', refreshToken)
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <div>Error...</div>
  }
  const { userGender } = data.mainPageResponse
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (data) {
      console.log('usergender', userGender)
      if (userGender === 'MALE') {
        router.push('/main')
      } else {
        router.push('/userinfo/1')
      }
    }
  })
  return (
    <div>
      <Loading />
    </div>
  )
}

export default OauthPage
