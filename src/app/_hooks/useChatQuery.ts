'use client'

import { getMessages } from '@/_service/chat'
import { useQuery } from '@tanstack/react-query'

export const useChatQuery = (userId: number, size: number, page: number) => {
  const queryKey = ['chat', userId, size, page]
  const {
    isLoading,
    isError,
    data: chatHistory,
    isSuccess,
  } = useQuery<ResponseChatGet, Error>({
    queryKey,
    queryFn: () => getMessages(userId, size, page),
  })

  return { isLoading, isError, chatHistory, isSuccess }
}
