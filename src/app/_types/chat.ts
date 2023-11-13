interface ChatMessageSend {
  roomId: number
  senderId: number
  message: string
}

interface ChatMessageGet {
  roomId: number
  messageId: number
  content: string
  senderId: number
  sendTime: string
}
