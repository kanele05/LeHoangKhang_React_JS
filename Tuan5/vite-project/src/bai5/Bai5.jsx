import { Navigate, Route, Routes } from 'react-router-dom'
import ExerciseShell from '../layouts/ExerciseShell'
import ProductDetailPage from '../bai3/ProductDetailPage'
import ProductsPage from '../bai3/ProductsPage'
import CheckoutPage from './CheckoutPage'

function Bai5() {
  return (
    <ExerciseShell
      subtitle="Bai 5: Dieu huong bang code voi useNavigate()."
      title="Bai 5 - Programmatic Navigation"
    >
      <Routes>
        <Route element={<Navigate replace to="/products" />} path="/" />
        <Route element={<ProductsPage />} path="/products" />
        <Route element={<ProductDetailPage />} path="/products/:id" />
        <Route element={<CheckoutPage />} path="/checkout" />
      </Routes>
    </ExerciseShell>
  )
}

export default Bai5
