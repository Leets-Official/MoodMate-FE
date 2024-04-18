import { getMessages } from '@/_service/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteChatQuery = (
  userId: number,
  roomId: number,
  size: number,
) => {
  return useInfiniteQuery<ResponseChatGet, Error>({
    queryKey: ['chat', userId, roomId],
    queryFn: ({ pageParam }) => {
      return getMessages(roomId, size, pageParam as number)
    },
    enabled: !!userId && !!roomId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (
        lastPage.pageable.totalPages === 0 ||
        lastPage.pageable.totalPages === lastPage.pageable.page
      ) {
        return undefined
      }
      return lastPage.pageable.page + 1
    },
  })
}
