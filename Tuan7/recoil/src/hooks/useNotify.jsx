import { useSetRecoilState } from 'recoil'
import toastAtom from '../states/ToastAtom'

export default function useNotify() {
  const setToast = useSetRecoilState(toastAtom)

  function notify(message) {
    const value = String(message).trim()
    if (!value) {
      return
    }

    setToast({
      id: Date.now(),
      message: value,
    })
  }

  return notify
}
