import { atom } from 'recoil'

const usersAtom = atom({
  key: 'usersAtom',
  default: {
    data: [],
    loading: false,
    error: null,
  },
})

export default usersAtom