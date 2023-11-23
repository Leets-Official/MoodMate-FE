import { atom } from 'recoil'

export const MyChatListState = atom<string[] | null>({
  key: 'MyChatListState',
  default: null,
})
