'use client'

import { useQuery } from '@tanstack/react-query'
import { socialLogin } from '@/_service/login'

export const useLoginQuery = () => {
  const queryKey = ['login']
  const { isLoading, isError } = useQuery({
    queryKey,
    queryFn: socialLogin,
  })

  return { isLoading, isError }
}
