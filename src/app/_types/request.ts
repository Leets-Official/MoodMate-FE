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

/** 채팅방 번호 */
interface RequestChatHistory {
  room_no: number
}

/** 채팅 내용 */
interface RequestChatContent extends RequestChatHistory {
  content: string
}
