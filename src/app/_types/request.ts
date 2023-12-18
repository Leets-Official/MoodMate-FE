interface RequestOauth {
  code: string
}

interface RequestUserInfo extends UserInfo {}

interface RequestMoodyInfo {
  department_possible: boolean
  mood: string
  age_min: number
  age_max: number
}

interface RequestChatHistory {
  roomId: number
  userId: number
}

interface RequestChatSendMessage extends RequestChatHistory {
  content: string | null
}
