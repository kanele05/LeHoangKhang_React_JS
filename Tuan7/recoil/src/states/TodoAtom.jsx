import { atom } from 'recoil'

const todoAtom = atom({
  key: 'todoAtom',
  default: [],
})

export default todoAtom