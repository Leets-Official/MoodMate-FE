interface UserInfoData {
  nickname: string
  gender: 'MALE' | 'FEMALE' | ''
  year: number
  department: string
  keywords: string[]
}

interface PreferInfoData {
  preferYearMin: number
  preferYearMax: number
  preferDepartmentPossible: boolean
  preferMood: string
}

interface EditPreferInfoData {
  preferYearMin: number
  preferYearMax: number
  userKeywords: string[]
  preferMood: string
}
