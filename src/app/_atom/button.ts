import { atom } from 'recoil'

interface selectedValueState {
  selectedValue: boolean
}

export const selectedValueState = atom<selectedValueState>({
  key: 'selectedValueState',
  default: {
    selectedValue: false,
  },
})
