import { atom } from 'recoil'

export const userInfoState = atom<UserInfoData>({
  key: 'userInfoState',
  default: {
    nickname: '',
    gender: '',
    year: 1994,
    department: '',
    keywords: [],
  },
})

export const preferInfoState = atom<PreferInfoData>({
  key: 'preferInfoState',
  default: {
    preferYearMin: 1994,
    preferYearMax: 2004,
    preferDepartmentPossible: true,
    preferMood: '',
  },
})
