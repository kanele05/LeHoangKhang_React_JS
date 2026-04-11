import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  function notify(message, type = 'info') {
    const text = String(message).trim()
    if (!text) {
      return
    }

    setNotification({
      id: Date.now(),
      message: text,
      type,
    })
  }

  function clearNotification() {
    setNotification(null)
  }

  useEffect(() => {
    if (!notification) {
      return undefined
    }

    const timerId = setTimeout(() => {
      setNotification(null)
    }, 3000)

    return () => {
      clearTimeout(timerId)
    }
  }, [notification])

  const value = useMemo(
    () => ({
      notification,
      notify,
      clearNotification,
    }),
    [notification],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('useNotification must be used inside NotificationProvider')
  }

  return context
}
