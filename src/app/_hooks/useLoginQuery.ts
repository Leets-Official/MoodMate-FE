'use client'

import { useQuery } from '@tanstack/react-query'
import { socialLogin } from '@/_service/login'

export const useLoginQuery = () => {
  const queryKey = ['login']
  const { isLoading, isError, data } = useQuery<ResponseLogin, Error>({
    queryKey,
    queryFn: socialLogin,
  })

  return { isLoading, isError, data }
}
