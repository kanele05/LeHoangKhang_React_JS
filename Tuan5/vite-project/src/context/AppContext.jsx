import { useState } from 'react'
import { AppContext } from './contextInstance'

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const login = (username = 'student-router') => {
    setUser({
      name: username,
      role: 'Student',
    })
  }

  const logout = () => {
    setUser(null)
  }

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (productId, delta) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <AppContext.Provider
      value={{
        addToCart,
        cartCount,
        cartItems,
        cartTotal,
        login,
        logout,
        removeFromCart,
        updateQuantity,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
