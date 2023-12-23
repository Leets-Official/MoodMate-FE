import { atom } from 'recoil'

export const editPreferInfoState = atom<EditPreferInfoData>({
  key: 'editPreferInfoState',
  default: {
    userKeywords: [],
    preferYearMin: 1994,
    preferYearMax: 2004,
    preferMood: '',
  },
})
