import { getMessages } from '@/_service/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteChatQuery = (
  userId: number,
  roomId: number,
  size: number,
) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<ResponseChatGet, Error>({
      queryKey: ['chat', userId, roomId],
      queryFn: ({ pageParam }) => {
        console.log(pageParam)
        return getMessages(roomId, size, pageParam as number)
      },
      enabled: !!userId && !!roomId,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (
          (lastPage.pageable.totalElements === 0 &&
            lastPage.pageable.totalPages === 0) ||
          lastPage.pageable.totalPages === lastPage.pageable.page
        ) {
          return undefined
        }
        return lastPage.pageable.page + 1
      },
    })

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status }
}
