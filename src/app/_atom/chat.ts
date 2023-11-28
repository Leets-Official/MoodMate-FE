import { atom } from 'recoil'

export const realTimeMessagesState = atom<ChatMessageFromServer[]>({
  key: 'realTimeMessages',
  default: [],
})

export const messageState = atom<ChatMessageFromServer[]>({
  key: 'messageState',
  default: [],
})
