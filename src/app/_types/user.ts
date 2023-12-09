interface SimpleUser {
  gender: 'MALE' | 'FEMALE'
  nickname: string
}

interface UserInfo extends SimpleUser {
  year: number
  keywords: string[]
  department: string
}

interface PartnerInfo extends UserInfo {
  preferMood: string
}
