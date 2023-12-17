'use client'

import { getMessages } from '@/_service/chat'
import { useQuery } from '@tanstack/react-query'

export const useChatQuery = (roomId: number, size: number, page: number) => {
  const queryKey = ['chat', roomId, size, page]
  const { isError, data: chatHistory } = useQuery<ResponseChatGet, Error>({
    queryKey,
    queryFn: () => getMessages(roomId, size, page),
  })

  return { isError, chatHistory }
}
