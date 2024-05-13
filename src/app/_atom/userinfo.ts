import { atom } from 'recoil'

export const userInfoState = atom<UserInfoData>({
  key: 'userInfoState',
  default: {
    nickname: '',
    gender: '',
    birthYear: 1995,
    department: '',
    keywords: [],
  },
})

export const preferInfoState = atom<PreferInfoData>({
  key: 'preferInfoState',
  default: {
    preferYearMin: 1995,
    preferYearMax: 2005,
    preferDepartmentPossible: true,
    preferMood: '',
  },
})

export const editUserInfoState = atom<EditUserInfoData>({
  key: 'editUserInfoState',
  default: {
    userGender: '',
    userNickname: '',
    year: 1995,
    userDepartment: '',
    userKeywords: [],
    preferYearMax: 2005,
    preferYearMin: 1995,
    preferDepartmentPossible: true,
    preferMood: '',
  },
})
