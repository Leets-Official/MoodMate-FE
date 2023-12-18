interface ResponseChatGet {
  user: {
    gender: 'MALE' | 'FEMALE'
    nickname: string
    roomActive: boolean
  }
  pageable: {
    size: number
    page: number
    totalPages: number
    totalElements: number
  }
  chatList: ChatMessageFromServer[]
}

interface ResponseMessage {
  message: string
}

interface ResponseLogin {
  accessToken: string
  refreshToken: string
}

interface ResponseMain {
  mainPageResponse: {
    userId: number
    userGender: string
    userMatchActive: boolean
    roomId: number | -1
    roomActive: boolean
  }
}
interface ResponseMyPage {
  myPageResponse: {
    userGender: string
    userNickname: string
    year: number
    userDepartment: string
    userKeywords: string[]
    preferYearMin: number
    preferYearMax: number
    preferDepartmentPossible: boolean
    preferMood: string
  }
}
