import { atom } from 'recoil'

type QuestionState = number

export const currentQuestionState = atom<QuestionState>({
  key: 'currentQuestionState',
  default: 0,
})
