import { atom } from 'recoil'

export const userInfoState = atom<UserInfoData>({
  key: 'userInfoState',
  default: {
    nickname: '',
    gender: 'MALE',
    year: 0,
    department: '',
    keywords: [],
  },
})

export const preferInfoState = atom<PreferInfoData>({
  key: 'preferInfoState',
  default: {
    preferYearMin: 0,
    preferYearMax: 0,
    preferDepartmentPossible: false,
    preferMood: '',
  },
})
