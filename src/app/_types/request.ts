/** 소셜로그인 요청 데이터 */
interface RequestOauth {
  code: string
}

/** 회원정보 입력 요청 데이터 */
interface RequestUserInfo extends UserInfo {}

/** 무디 조건 요청 데이터 */
interface RequestMoodyInfo {
  department_possible: boolean
  mood: string
  age_min: number
  age_max: number
}

/** 채팅방 기록 가져오기 */
interface RequestChatHistory {
  roomId: number
  userId: number
}

/** 채팅 메시지 보내기 */
interface RequestChatSendMessage extends RequestChatHistory {
  content: string | null // 예외처리
}
