/** 채팅 내역 불러오기 응답 데이터 */
interface ResponseChatGet {
  user: {
    gender: 'MALE' | 'FEMALE'
    nickname: string
  }
  pageable: {
    size: number
    page: number
    totalPages: number
  }
  chatList: ChatMessageFromServer[]
}

/** 메세지 받아오기 응답 데이터 */
interface ResponseMessage {
  message: string
}

/** 소셜로그인 응답 데이터 */
interface ResponseLogin {
  accessToken: string
  refreshToken: string
}

/** 메인페이지 응답 데이터 */
interface ResponseMain {
  mainPageResponse: {
    userId: number
    userGender: string
    userMatchActive: boolean
    roomId: number | -1
    roomActive: boolean
  }
}
