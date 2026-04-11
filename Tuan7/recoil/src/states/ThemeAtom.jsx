import { atom } from 'recoil'

const THEME_STORAGE_KEY = 'appTheme'

const themeAtom = atom({
  key: 'themeAtom',
  default: 'light',
  effects: [
    ({ setSelf, onSet }) => {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

      if (savedTheme === 'light' || savedTheme === 'dark') {
        setSelf(savedTheme)
      }

      onSet((newTheme) => {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme)
      })
    },
  ],
})

export default themeAtom