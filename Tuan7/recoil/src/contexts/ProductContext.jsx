import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchProducts(signal) {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://dummyjson.com/products?limit=12', {
        signal,
      })

      if (!response.ok) {
        throw new Error('Khong the tai danh sach san pham')
      }

      const payload = await response.json()
      setProducts(payload.products || [])
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      const message = err instanceof Error ? err.message : 'Da xay ra loi khi tai san pham'
      setError(message)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts(controller.signal)

    return () => {
      controller.abort()
    }
  }, [])

  function refreshProducts() {
    fetchProducts(undefined)
  }

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      refreshProducts,
    }),
    [error, loading, products],
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('useProducts must be used inside ProductProvider')
  }

  return context
}
