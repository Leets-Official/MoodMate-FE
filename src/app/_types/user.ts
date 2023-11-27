interface SimpleUser {
  gender: 'MALE' | 'FEMALE'
  nickname: string
}

interface UserInfo extends SimpleUser {
  age: number
  keywords: string[]
  department: string
}

interface PartnerInfo extends UserInfo {
  mood: string
}
