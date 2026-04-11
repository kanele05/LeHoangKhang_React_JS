import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import toastAtom from '../states/ToastAtom'

export default function ToastHost() {
  const [toast, setToast] = useRecoilState(toastAtom)

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timerId = setTimeout(() => {
      setToast(null)
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [toast, setToast])

  if (!toast) {
    return null
  }

  return <div className='toast'>{toast.message}</div>
}
