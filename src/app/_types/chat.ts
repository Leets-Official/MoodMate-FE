interface ChatMessageSend {
  userId: number
  content: string
}

interface ChatMessageGet {
  messageId: number
  content: string
  senderId: number
  sendTime: string
  isRead: boolean
}
