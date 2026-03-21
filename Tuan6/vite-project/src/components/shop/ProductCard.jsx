import { useCart, ADD_TO_CART, selectIsInCart } from '../../context/CartContext';
import { formatVND } from '../../data/products';

export default function ProductCard({ product }) {
  const { items, dispatch } = useCart();
  const inCart = selectIsInCart(items, product.id);

  const cartItem = items.find((i) => i.id === product.id);

  return (
    <div className={`product-card ${inCart ? 'in-cart' : ''}`}>
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{formatVND(product.price)}</span>
          <button
            className={`btn-add-cart ${inCart ? 'added' : ''}`}
            onClick={() =>
              dispatch({ type: ADD_TO_CART, payload: product })
            }
          >
            {inCart ? `Trong giỏ (${cartItem.qty})` : '+ Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  );
}
