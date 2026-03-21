import { useAppContext } from '../context/useAppContext'
import { formatPrice } from '../utils/formatPrice'

function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useAppContext()

  return (
    <section className="panel">
      <p className="eyebrow">Bai 7</p>
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <div className="card">
          <p>Gio hang dang trong. Hay vao trang Products de them san pham.</p>
        </div>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="card cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)} type="button">
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} type="button">
                  +
                </button>
              </div>

              <button className="ghost-button" onClick={() => removeFromCart(item.id)} type="button">
                Remove
              </button>
            </article>
          ))}

          <div className="summary-card">
            <span>Tong tien</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </div>
      )}
    </section>
  )
}

export default CartPage
