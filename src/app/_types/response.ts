/** 채팅방 내역 불러오기 응답 데이터 */
interface ResponseChatEnter {
  roomId: number
  chatList: ChatMessageGet[]
}

/** 메세지 받아오기 응답 데이터 */
interface ResponseMessage {
  message: string
}

/** 소셜로그인 응답 데이터 */
interface ResponseLogin {
  accessToken: string
  refreshTokce: string
}
