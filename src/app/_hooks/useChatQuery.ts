'use client'

import { getMessages } from '@/_service/chat'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useChatQuery = (roomId: number, size: number, page: number) => {
  const queryKey = ['chat', roomId, size, page]
  const {
    isLoading,
    isError,
    data: chatHistory,
  } = useSuspenseQuery<ResponseChatGet, Error>({
    queryKey,
    queryFn: () => getMessages(roomId, size, page),
  })

  return { isLoading, isError, chatHistory }
}
