import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/useAppContext'
import { products } from '../data/products'
import { formatPrice } from '../utils/formatPrice'

function ProductDetailPage() {
  const navigate = useNavigate()
  const { addToCart } = useAppContext()
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return <Navigate replace to="/not-found" />
  }

  return (
    <section className="panel">
      <p className="eyebrow">Bai 3 + Bai 5 + Bai 7</p>
      <h2>{product.name}</h2>
      <p className="detail-id">Product ID: {id}</p>
      <p className="lead">{product.description}</p>
      <strong className="price">{formatPrice(product.price)}</strong>

      <div className="button-row">
        <button className="primary-button" onClick={() => navigate('/checkout')} type="button">
          Mua hang
        </button>
        <button className="secondary-button" onClick={() => addToCart(product)} type="button">
          Add to cart
        </button>
      </div>
    </section>
  )
}

export default ProductDetailPage
