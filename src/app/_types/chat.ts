interface ChatMessageFromClient {
  roomId: number
  userId: number
  content: string
}

interface ChatMessageFromServer {
  messageId: number | string
  content: string
  userId: number
  createdAt: string
  isRead: boolean
}
