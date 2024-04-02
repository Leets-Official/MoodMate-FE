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
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/callback/kakao?code=${codeURL}`,
          )
          .then((response) => {
            // 요청이 성공할 경우 토큰을 받아옴
            const accessTokenExpiry = new Date()
            accessTokenExpiry.setTime(
              accessTokenExpiry.getTime() + 3 * 60 * 60 * 1000,
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
  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <Error />
  }
  useEffect(() => {
    if (data) {
      if (
        data.mainPageResponse.userGender === 'MALE' ||
        data.mainPageResponse.userGender === 'FEMALE'
      ) {
        router.push('/userinfo/1')
      } else {
        router.push('/main')
      }
    }
  }, [data, router])
}

export default LoginHandler
