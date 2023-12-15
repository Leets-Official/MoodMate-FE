'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Loading from '@/_components/common/Loading'
import { useMainQuery } from '@/_hooks/useMainQuery'

const OauthPage = () => {
  const { isLoading, isError, data } = useMainQuery()
  const [accessToken, setAccessToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState<string>('')
  const router = useRouter()
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
  Cookies.set('accessToken', accessToken)
  Cookies.set('refreshToken', refreshToken)

  useEffect(() => {
    if (data) {
      console.log('usergender', data.mainPageResponse.userGender)
      if (
        data.mainPageResponse.userGender === 'MALE' ||
        data.mainPageResponse.userGender === 'FEMALE'
      ) {
        router.push('/main')
      } else {
        router.push('/userinfo/1')
      }
    }
  }, [data, router])

  if (isLoading) {
    return <Loading />
  }

  if (isError || !data) {
    return <div>Error...</div>
  }
  return (
    <div>
      <Loading />
    </div>
  )
}

export default OauthPage
