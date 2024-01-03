'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { myPageInfo } from '@/_service/mypage'

export const useMyPageQuery = () => {
  const queryKey = ['myPage']
  const { isLoading, isError, data } = useSuspenseQuery<ResponseMyPage, Error>({
    queryKey,
    queryFn: myPageInfo,
  })

  return { isLoading, isError, data }
}
