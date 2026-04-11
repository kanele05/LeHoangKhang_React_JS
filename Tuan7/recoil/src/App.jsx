import { useState } from 'react'
import './App.css'
import { useAuth } from './contexts/AuthContext'
import { useCart } from './contexts/CartContext'
import { useNotification } from './contexts/NotificationContext'
import { useProducts } from './contexts/ProductContext'

function formatVnd(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const { user, token, loading: authLoading, error: authError, login, logout, fetchProtectedProfile } =
    useAuth()
  const {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart()
  const {
    products,
    loading: productLoading,
    error: productError,
    refreshProducts,
  } = useProducts()
  const { notification } = useNotification()

  const [usernameInput, setUsernameInput] = useState('emilys')
  const [passwordInput, setPasswordInput] = useState('emilyspass')
  const [secureProfile, setSecureProfile] = useState(null)

  const hasGlobalLoading = authLoading || productLoading
  const globalErrors = [authError, productError].filter(Boolean)

  async function handleLogin() {
    const username = usernameInput.trim()
    const password = passwordInput.trim()

    try {
      if (!username || !password) {
        return
      }

      await login(username, password)
      const profile = await fetchProtectedProfile()
      setSecureProfile(profile)
    } catch {
      setSecureProfile(null)
    }
  }

  function handleLogout() {
    setSecureProfile(null)
    logout()
  }

  async function handleLoadProtectedApi() {
    try {
      const profile = await fetchProtectedProfile()
      setSecureProfile(profile)
    } catch {
      setSecureProfile(null)
    }
  }

  return (
    <div className='mini-app'>
      <h1>Mini Product Manager</h1>

      <div className='panel'>
        <h2>Global Status</h2>
        <p>Loading global: {hasGlobalLoading ? 'true' : 'false'}</p>
        {globalErrors.length > 0 ? (
          globalErrors.map((item) => (
            <p className='error-text' key={item}>
              Error: {item}
            </p>
          ))
        ) : (
          <p>Khong co loi global.</p>
        )}
      </div>

      <div className='panel auth-panel'>
        <h2>Auth Context</h2>
        <p>Tai khoan demo: emilys / emilyspass</p>
        {user ? (
          <>
            <p>Dang nhap voi username: {user.username}</p>
            {user.firstName && user.lastName && <p>Ho ten: {user.firstName} {user.lastName}</p>}
            <p>
              Token: {token ? `${token.slice(0, 18)}...` : 'Khong co token'}
            </p>
            <button onClick={handleLoadProtectedApi} disabled={authLoading}>
              Goi API can auth
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <input
              className='auth-input'
              type='text'
              value={usernameInput}
              onChange={(event) => setUsernameInput(event.target.value)}
              placeholder='Nhap username'
            />
            <input
              className='auth-input'
              type='password'
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder='Nhap password'
            />
            <button onClick={handleLogin} disabled={authLoading}>
              {authLoading ? 'Dang login...' : 'Login API'}
            </button>
          </>
        )}

        {authError && <p className='error-text'>Loi: {authError}</p>}

        {secureProfile && (
          <div className='protected-box'>
            <p>Protected API data:</p>
            <p>ID: {secureProfile.id}</p>
            <p>Email: {secureProfile.email}</p>
          </div>
        )}
      </div>

      <div className='panel'>
        <h2>Product Context</h2>
        <button onClick={refreshProducts} disabled={productLoading}>
          {productLoading ? 'Dang tai san pham...' : 'Tai lai san pham'}
        </button>

        {productError && <p className='error-text'>Loi: {productError}</p>}

        {!productLoading && !productError && (
          <div className='product-grid'>
            {products.map((product) => (
              <div className='product-card' key={product.id}>
                <img alt={product.title} className='product-thumb' src={product.thumbnail} />
                <p className='product-title'>{product.title}</p>
                <p>{formatVnd(product.price * 25000)}</p>
                <button onClick={() => addToCart({ ...product, price: product.price * 25000 })}>
                  Them vao gio
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='panel'>
        <h2>Cart Context</h2>
        <p>Tong mat hang: {totalItems}</p>
        <p>Tong tien: {formatVnd(totalPrice)}</p>
        {cartItems.length > 0 && <button onClick={clearCart}>Xoa gio hang</button>}

        <ul className='cart-list'>
          {cartItems.length === 0 ? (
            <li>Gio hang dang trong.</li>
          ) : (
            cartItems.map((item) => (
              <li className='cart-item' key={item.id}>
                <span>
                  {item.title} x {item.quantity} = {formatVnd(item.quantity * item.price)}
                </span>
                <div className='inline-actions'>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {notification && <div className={`toast ${notification.type}`}>{notification.message}</div>}
    </div>
  )
}

export default App
