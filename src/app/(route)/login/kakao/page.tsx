'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import usePostLogin from '@/_service/oauth'

const LoginHandler = () => {
  const router = useRouter()
  const postLoginMutation = usePostLogin()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const codeURL = new URL(window.location.href).searchParams.get('code')
      postLoginMutation.mutate(
        { code: codeURL },
        {
          onSuccess: (data) => {
            const accessTokenExpiry = new Date()
            accessTokenExpiry.setTime(
              accessTokenExpiry.getTime() + 3 * 60 * 60 * 1000,
            )
            Cookies.set('accessToken', data.data.accessToken, {
              expires: accessTokenExpiry,
            })
            const refreshTokenExpiry = new Date()
            refreshTokenExpiry.setTime(
              refreshTokenExpiry.getTime() + 3 * 24 * 60 * 60 * 1000,
            )
            Cookies.set('refreshToken', data.data.refreshToken, {
              expires: refreshTokenExpiry,
            })
            router.push('/main')
          },
          onError: (error) => {
            console.error('Error fetching token:', error)
          },
        },
      )
    }
  }, [router, postLoginMutation])

  return null
}

export default LoginHandler
