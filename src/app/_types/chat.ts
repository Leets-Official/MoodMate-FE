interface ChatMessageFromClient {
  roomId: number
  userId: number
  content: string
  isRead: number
  createdAt: string
}

interface ChatMessageFromServer {
  messageId: number
  content: string
  userId: number
  createdAt: string
  isRead: number
}
