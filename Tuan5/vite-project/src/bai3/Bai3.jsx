import { Link, Route, Routes } from 'react-router-dom'
import ExerciseShell from '../layouts/ExerciseShell'
import ProductDetailPage from './ProductDetailPage'
import ProductsPage from './ProductsPage'

function Bai3Home() {
  return (
    <section className="panel">
      <p className="eyebrow">Bai 3</p>
      <h2>Dynamic Route</h2>
      <p className="lead">
        Trang san pham su dung <code>/products/:id</code> va <code>useParams()</code>.
      </p>
      <Link className="primary-button" to="/products">
        Mo danh sach san pham
      </Link>
    </section>
  )
}

function Bai3() {
  return (
    <ExerciseShell
      subtitle="Bai 3: Dynamic route cho trang chi tiet san pham."
      title="Bai 3 - Dynamic Route"
    >
      <Routes>
        <Route element={<Bai3Home />} path="/" />
        <Route element={<ProductsPage />} path="/products" />
        <Route element={<ProductDetailPage />} path="/products/:id" />
      </Routes>
    </ExerciseShell>
  )
}

export default Bai3
