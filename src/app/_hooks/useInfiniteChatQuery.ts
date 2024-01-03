import { getMessages } from '@/_service/chat'
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

export const useInfiniteChatQuery = (
  userId: number,
  roomId: number,
  size: number,
) => {
  return useSuspenseInfiniteQuery<ResponseChatGet, Error>({
    queryKey: ['chat', userId, roomId],
    queryFn: ({ pageParam }) => {
      return getMessages(roomId, size, pageParam as number)
    },
    initialPageParam: 1,
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
