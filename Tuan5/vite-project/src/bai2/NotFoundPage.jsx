import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel not-found-panel">
      <p className="eyebrow">Bai 2</p>
      <h2>404 Not Found</h2>
      <p className="lead">URL khong ton tai. Route `*` da bat loi va hien thi trang nay.</p>
      <Link className="primary-button" to="/">
        Ve trang chu
      </Link>
    </section>
  )
}

export default NotFoundPage
