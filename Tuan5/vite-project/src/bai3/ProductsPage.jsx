import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatPrice } from '../utils/formatPrice'

function ProductsPage() {
  return (
    <section className="panel">
      <p className="eyebrow">Bai 3 + Bai 7</p>
      <h2>Product List</h2>
      <div className="grid product-grid">
        {products.map((product) => (
          <article className="card product-card" key={product.id}>
            <span className="product-tag">{product.category}</span>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <strong>{formatPrice(product.price)}</strong>
            <Link className="secondary-button" to={`/products/${product.id}`}>
              Xem chi tiet
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
