import { getMessages } from '@/_service/chat'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useInfiniteChatQuery = (
  userId: number,
  roomId: number,
  size: number,
) => {
  const { data, fetchNextPage, hasNextPage, hasPreviousPage } =
    useInfiniteQuery<ResponseChatGet, Error>({
      queryKey: ['chat', userId, roomId],
      queryFn: ({ pageParam }) => {
        console.log(pageParam)
        return getMessages(roomId, size, pageParam as number)
      },
      enabled: !!userId && !!roomId,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        const lastFetchedPage = pages[pages.length - 1]
        const currentPage = lastFetchedPage?.pageable?.page || 0
        const totalPages = lastFetchedPage?.pageable?.totalPages || 0

        if (currentPage >= totalPages) {
          return undefined // No more pages to fetch
        }

        return currentPage + 1 // Return the next page number
      },
    })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  }
}
