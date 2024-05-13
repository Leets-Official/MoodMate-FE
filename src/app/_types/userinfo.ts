interface UserInfoData {
  nickname: string
  gender: string
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

interface EditUserInfoData {
  userGender: string
  userNickname: string
  year: number
  userDepartment: string
  userKeywords: string[]
  preferYearMax: number
  preferYearMin: number
  preferDepartmentPossible: boolean
  preferMood: string
}
