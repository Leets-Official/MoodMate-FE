interface UserInfoData {
  nickname: string
  gender: 'MALE' | 'FEMALE' | ''
  birthYear: number
  department: string
  keywords: string[]
}

interface PreferInfoData {
  preferYearMin: number
  preferYearMax: number
  preferDepartmentPossible: boolean
  preferMood: string
}
