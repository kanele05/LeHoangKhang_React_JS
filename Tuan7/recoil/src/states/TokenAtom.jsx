import { atom } from 'recoil'

const TOKEN_STORAGE_KEY = 'authToken'

const tokenAtom = atom({
  key: 'tokenAtom',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

      if (savedToken) {
        setSelf(savedToken)
      }

      onSet((newToken) => {
        if (newToken) {
          localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
          return
        }

        localStorage.removeItem(TOKEN_STORAGE_KEY)
      })
    },
  ],
})

export default tokenAtom