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

interface Pageable {
  page: number
  size: number
  totalElements: number
  totalPages: number
}

interface ChatMessageFromServerFull {
  chatList: ChatMessageFromServer[]
  pageable: Pageable
  user: SimpleUser
}
