'use client'

import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useMainQuery } from '@/_hooks/useMainQuery'
import Loading from '@/_components/common/Loading'
import Error from '@/(route)/error'

const LoginHandler = () => {
  const router = useRouter()
  const { isLoading, isError, data } = useMainQuery()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      if (codeURL) {
        axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_URL}oauth/callback/kakao`, {
            authorizationCode: codeURL,
          })
          .then((response) => {
            const accessTokenExpiry = new Date()
            accessTokenExpiry.setTime(
              accessTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
            )
            Cookies.set('accessToken', response.data.accessToken, {
              expires: accessTokenExpiry,
            })
            const refreshTokenExpiry = new Date()
            refreshTokenExpiry.setTime(
              refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
            )
            Cookies.set('refreshToken', response.data.refreshToken, {
              expires: refreshTokenExpiry,
            })
          })
          .catch((error) => {
            console.error('Error fetching token:', error)
          })
      }
    }
  }, [router])

  useEffect(() => {
    if (data && data.mainPageResponse) {
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
    return <Error />
  }
}

export default LoginHandler
