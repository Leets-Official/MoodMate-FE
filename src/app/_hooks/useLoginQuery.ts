'use client'

import { useQuery } from '@tanstack/react-query'
import { socialLogin } from '@/_service/login'
import Cookies from 'js-cookie'

export const useLoginQuery = () => {
  const queryKey = ['login']
  const {
    data: accessToken,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: socialLogin,
  })

  if (accessToken) {
    Cookies.set('accessToken', accessToken)
  }

  return { isLoading, isError }
}
