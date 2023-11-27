import { getMessages } from '@/_service/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteChatQuery = (userId: number, size: number) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ResponseChatGet, Error>({
      queryKey: ['chat', userId],
      queryFn: ({ pageParam }) => {
        console.log(pageParam)
        return getMessages(userId, size, pageParam as number)
      },
      enabled: !!userId, // **
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagable.page + 1 || undefined, // 맞는지 확인
    })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
}
