import { atom } from 'recoil'

const searchAtom = atom({
  key: 'searchAtom',
  default: {
    query: '',
    data: [],
    loading: false,
    error: null,
  },
})

export default searchAtom