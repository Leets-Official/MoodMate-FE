'use client'

import { useQuery } from '@tanstack/react-query'
import { mainInfo } from '@/_service/main'

export const useMainQuery = () => {
  const queryKey = ['main']
  const { isLoading, isError, data } = useQuery<ResponseChatGet, Error>({
    queryKey,
    queryFn: () => mainInfo(),
  })

  return { isLoading, isError, data }
}
