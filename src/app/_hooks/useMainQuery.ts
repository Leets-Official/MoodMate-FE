'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { mainInfo } from '@/_service/main'

export const useMainQuery = () => {
  const queryKey = ['main']
  const { isError, data } = useSuspenseQuery<ResponseMain, Error>({
    queryKey,
    queryFn: mainInfo,
  })

  return { isError, data }
}
