import { atom } from 'recoil'

export const realTimeMessagesState = atom<ChatMessageGet[]>({
  key: 'realTimeMessages',
  default: [],
})

export const messageState = atom<string[]>({
  key: 'messageState',
  default: [],
})
