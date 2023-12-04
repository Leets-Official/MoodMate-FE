import { atom } from 'recoil'

interface QuestionState {
  current: number
}

export const currentQuestionState = atom<QuestionState>({
  key: 'currentQuestionState',
  default: {
    current: 0,
  },
})
