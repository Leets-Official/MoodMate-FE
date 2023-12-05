import { atom } from 'recoil'

interface InputValueState {
  inputValue: string
}
export const inputValueState = atom<InputValueState>({
  key: 'inputValueState',
  default: {
    inputValue: '',
  },
})
