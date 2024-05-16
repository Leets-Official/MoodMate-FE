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
            Cookies.set('accessToken', response.data.accessToken, {
              expires: 3,
              secure: true,
              sameSite: 'None',
            })
            Cookies.set('refreshToken', response.data.refreshToken, {
              expires: 7,
              secure: true,
              sameSite: 'None',
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
        router.push('/guide')
      }
    }
  }, [data, router])

  if (isLoading) {
    return <Loading />
  }
  if (isError || !data) {
    return <Error />
  }
  return
}

export default LoginHandler
