'use client'

import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Loading from '@/_components/common/Loading'
import { useMainQuery } from '@/_hooks/useMainQuery'
import ErrorPage from '@/(route)/error'
import { useCustomQuery } from '@/_hooks/useCustomQuery'
import { mainInfo } from '@/_service/main'

const OauthPage = () => {
  const { isLoading, isError, data } = useCustomQuery<ResponseMain>(
    ['main'],
    mainInfo,
  )
  // const { isLoading, isError, data } = useMainQuery()
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
  const accessTokenExpiry = new Date()
  accessTokenExpiry.setTime(accessTokenExpiry.getTime() + 3 * 60 * 60 * 1000)
  Cookies.set('accessToken', accessToken, { expires: accessTokenExpiry })

  const refreshTokenExpiry = new Date()
  refreshTokenExpiry.setTime(
    refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
  )
  Cookies.set('refreshToken', refreshToken, {
    expires: refreshTokenExpiry,
  })

  useEffect(() => {
    if (data) {
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
    return <ErrorPage />
  }

  return (
    <div>
      <Loading />
    </div>
  )
}

export default OauthPage
