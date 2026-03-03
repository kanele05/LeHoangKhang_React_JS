import { useState } from 'react'
import './LoginForm.css'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Username: ${username}\nPassword: ${password}`)
  }

  return (
    <div className="login-overlay">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Đăng nhập</h2>

        <div className="login-form__group">
          <label className="login-form__label" htmlFor="username">Username</label>
          <input
            id="username"
            className="login-form__input"
            type="text"
            placeholder="Nhập username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="login-form__group">
          <label className="login-form__label" htmlFor="password">Password</label>
          <input
            id="password"
            className="login-form__input"
            type="password"
            placeholder="Nhập password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="login-form__btn">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
