import { atom } from 'recoil'

const toastAtom = atom({
  key: 'toastAtom',
  default: null,
})

export default toastAtom