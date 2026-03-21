import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAppContext()
  const redirectPath = location.state?.from?.pathname || '/profile'

  if (user) {
    return <Navigate replace to={redirectPath} />
  }

  const handleLogin = () => {
    login()
    navigate(redirectPath, { replace: true })
  }

  return (
    <section className="panel auth-panel">
      <p className="eyebrow">Bai 6</p>
      <h2>Login</h2>
      <p className="lead">Dang nhap de truy cap cac trang duoc bao ve nhu Profile va Orders.</p>
      <button className="primary-button" onClick={handleLogin} type="button">
        Dang nhap nhanh
      </button>
    </section>
  )
}

export default LoginPage
