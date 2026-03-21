import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'

function ProtectedRoute({ children }) {
  const { user } = useAppContext()
  const location = useLocation()

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  return children
}

export default ProtectedRoute
