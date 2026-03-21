import { Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from '../context/AppContext.jsx'
import ExerciseShell from '../layouts/ExerciseShell'
import ProductDetailPage from '../bai3/ProductDetailPage'
import ProductsPage from '../bai3/ProductsPage'
import CheckoutPage from '../bai5/CheckoutPage'
import LoginPage from '../bai6/LoginPage'
import OrdersPage from '../bai6/OrdersPage'
import ProfilePage from '../bai6/ProfilePage'
import ProtectedRoute from '../bai6/ProtectedRoute'
import CartPage from './CartPage'

function Bai7() {
  return (
    <AppProvider>
      <ExerciseShell
        subtitle="Bai 7: Mini project shop router gom products, detail, cart, login va profile."
        title="Bai 7 - Mini Shop Router"
      >
        <Routes>
          <Route element={<Navigate replace to="/products" />} path="/" />
          <Route element={<ProductsPage />} path="/products" />
          <Route element={<ProductDetailPage />} path="/products/:id" />
          <Route element={<CartPage />} path="/cart" />
          <Route element={<CheckoutPage />} path="/checkout" />
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

export default Bai7
