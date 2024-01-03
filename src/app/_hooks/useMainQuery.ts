'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { mainInfo } from '@/_service/main'

export const useMainQuery = () => {
  const queryKey = ['main']
  const { isLoading, isError, data } = useSuspenseQuery<ResponseMain, Error>({
    queryKey,
    queryFn: mainInfo,
  })

  return { isLoading, isError, data }
}
