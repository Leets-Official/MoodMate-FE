import { atom } from 'recoil'

interface inputValueState {
  inputValue: string
}
export const inputValueState = atom({
  key: 'inputValueState',
  default: {
    inputValue: '',
  },
})
