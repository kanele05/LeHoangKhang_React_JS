import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNotification } from './NotificationContext'

const AuthContext = createContext(null)
const TOKEN_STORAGE_KEY = 'authToken'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) || '')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { notify } = useNotification()

  useEffect(() => {
    if (!token) {
      return
    }

    let ignore = false

    async function syncUserFromToken() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Token khong hop le hoac da het han')
        }

        const profile = await response.json()
        if (ignore) {
          return
        }

        setUser(profile)
      } catch (err) {
        if (ignore) {
          return
        }

        const message = err instanceof Error ? err.message : 'Khong the xac thuc token'
        setError(message)
        setUser(null)
        setToken('')
        localStorage.removeItem(TOKEN_STORAGE_KEY)
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    syncUserFromToken()

    return () => {
      ignore = true
    }
  }, [token])

  async function login(username, password) {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      })

      if (!response.ok) {
        throw new Error('Sai thong tin dang nhap')
      }

      const payload = await response.json()
      const accessToken = payload.accessToken || payload.token

      if (!accessToken) {
        throw new Error('Khong nhan duoc token tu API')
      }

      setToken(accessToken)
      setUser(payload)
      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken)
      notify(`Xin chao ${payload.username}`)
      return payload
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Dang nhap that bai'
      setError(message)
      setToken('')
      setUser(null)
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      notify(message, 'error')
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function fetchProtectedProfile() {
    if (!token) {
      throw new Error('Ban can login de goi API can auth')
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Khong the goi API can auth')
      }

      const profile = await response.json()
      setUser(profile)
      notify('Da goi API can auth thanh cong')
      return profile
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Khong the goi API can auth'
      setError(message)
      notify(message, 'error')
      throw err
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    setUser(null)
    setToken('')
    setError(null)
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    notify('Da logout')
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      logout,
      fetchProtectedProfile,
    }),
    [error, loading, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
