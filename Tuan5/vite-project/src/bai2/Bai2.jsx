import { Link, Route, Routes } from 'react-router-dom'
import ExerciseShell from '../layouts/ExerciseShell'
import NotFoundPage from './NotFoundPage'

function Bai2Home() {
  return (
    <section className="panel">
      <p className="eyebrow">Bai 2</p>
      <h2>Trang 404 Not Found</h2>
      <p className="lead">
        Thu vao <code>/not-found</code> hoac go sai URL bat ky de thay route <code>*</code>.
      </p>
      <div className="button-row">
        <Link className="primary-button" to="/not-found">
          Mo trang not-found
        </Link>
        <Link className="secondary-button" to="/abc">
          Thu URL sai
        </Link>
      </div>
    </section>
  )
}

function Bai2() {
  return (
    <ExerciseShell
      subtitle="Bai 2: Xu ly route khong ton tai bang path=*."
      title="Bai 2 - 404 Not Found"
    >
      <Routes>
        <Route element={<Bai2Home />} path="/" />
        <Route element={<NotFoundPage />} path="/not-found" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </ExerciseShell>
  )
}

export default Bai2
