'use client'

import { useQuery } from '@tanstack/react-query'
import { mypageInfo } from '@/_service/mypage'

export const useMypageQuery = () => {
  const queryKey = ['mypage']
  const { isLoading, isError, data } = useQuery<ResponseMypage, Error>({
    queryKey,
    queryFn: mypageInfo,
  })

  return { isLoading, isError, data }
}
