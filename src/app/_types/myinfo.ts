interface UserInfoData {
  nickname: string
  gender: '남' | '여'
  age: number
  department: string
  keywords: string[]
}

interface PreferInfoData {
  ageMin: number
  ageMax: number
  departmentPossible: boolean
  mood: string
}
