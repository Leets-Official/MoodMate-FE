import { atom } from 'recoil'

export const realTimeMessagesState = atom<ChatMessageFromClient[]>({
  key: 'realTimeMessages',
  default: [],
})

export const messageState = atom<ChatMessageFromServer[]>({
  key: 'messageState',
  default: [],
})
