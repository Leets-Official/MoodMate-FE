import { getMessages } from '@/_service/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteChatQuery = (userId: number, size: number) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['chat', userId],
      queryFn: ({ pageParam }) => {
        console.log(pageParam)
        // return getMessages(userId, size, pageParam)
        return 0
      },
      enabled: !!userId, // **
      initialPageParam: 1,
      //   getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage: number) => lastPage + 1,
    })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
}
