import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="panel hero-panel">
      <p className="eyebrow">Bai 1 + Bai 7</p>
      <h2>Hello Router</h2>
      <p className="lead">
        Day la trang Home trong bo route co ban. Menu chuyen trang bang <code>Link</code> va{' '}
        <code>NavLink</code> ma khong reload.
      </p>

      <div className="grid two-columns">
        <article className="card">
          <h3>7 bai da duoc tach component</h3>
          <ul className="feature-list">
            <li>Bai 1: Home, About, Contact</li>
            <li>Bai 2: 404 Not Found</li>
            <li>Bai 3: Dynamic route voi Product Detail</li>
            <li>Bai 4: Nested routes trong Dashboard</li>
            <li>Bai 5: useNavigate sang Checkout</li>
            <li>Bai 6: Protected route voi login</li>
            <li>Bai 7: Mini shop co cart va profile</li>
          </ul>
        </article>

        <article className="card accent-card">
          <h3>Luong test nhanh</h3>
          <p>{'Products -> Product Detail -> Add to cart -> Cart -> Login -> Profile'}</p>
          <Link className="primary-button" to="/products">
            Mo trang san pham
          </Link>
        </article>
      </div>
    </section>
  )
}

export default HomePage
