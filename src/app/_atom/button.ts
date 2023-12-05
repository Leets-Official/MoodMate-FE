import { atom } from 'recoil'

interface SelectedValueState {
  selectedValue: boolean
}

export const selectedValueState = atom<SelectedValueState>({
  key: 'selectedValueState',
  default: {
    selectedValue: false,
  },
})
