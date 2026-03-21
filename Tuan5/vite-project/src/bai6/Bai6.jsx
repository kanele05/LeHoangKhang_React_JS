import { Link, Route, Routes } from 'react-router-dom'
import { AppProvider } from '../context/AppContext.jsx'
import ExerciseShell from '../layouts/ExerciseShell'
import LoginPage from './LoginPage'
import OrdersPage from './OrdersPage'
import ProfilePage from './ProfilePage'
import ProtectedRoute from './ProtectedRoute'

function Bai6Home() {
  return (
    <section className="panel">
      <p className="eyebrow">Bai 6</p>
      <h2>Protected Route</h2>
      <p className="lead">
        Neu chua login, vao <code>/profile</code> hoac <code>/orders</code> se bi redirect ve{' '}
        <code>/login</code>.
      </p>
      <div className="button-row">
        <Link className="primary-button" to="/profile">
          Thu vao Profile
        </Link>
        <Link className="secondary-button" to="/orders">
          Thu vao Orders
        </Link>
      </div>
    </section>
  )
}

function Bai6() {
  return (
    <AppProvider>
      <ExerciseShell
        subtitle="Bai 6: Bao ve route can dang nhap bang Context API va Navigate."
        title="Bai 6 - Protected Route"
      >
        <Routes>
          <Route element={<Bai6Home />} path="/" />
          <Route element={<LoginPage />} path="/login" />
          <Route
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
            path="/profile"
          />
          <Route
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
            path="/orders"
          />
        </Routes>
      </ExerciseShell>
    </AppProvider>
  )
}

export default Bai6
