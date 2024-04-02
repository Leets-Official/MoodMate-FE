'use client'
import { useQuery } from '@tanstack/react-query'

export const useCustomQuery = <TResponse>(
  queryKey: string[],
  queryFn?: () => Promise<TResponse>,
) => {
  const { isLoading, isError, data } = useQuery<TResponse, Error>({
    queryKey,
    queryFn: queryFn,
  })

  return { isLoading, isError, data }
}
