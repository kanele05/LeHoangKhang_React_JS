import {
  useCart,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
} from '../../context/CartContext';
import { formatVND } from '../../data/products';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  return (
    <li className="cart-item">
      <span className="cart-item-emoji">{item.emoji}</span>

      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-subtotal">
          {formatVND(item.price * item.qty)}
        </span>
      </div>

      {/* Qty controls — Component chỉ dispatch action */}
      <div className="qty-controls">
        <button
          className="qty-btn"
          onClick={() => dispatch({ type: DECREASE_QTY, payload: item.id })}
          aria-label="Giảm"
        >
          −
        </button>
        <span className="qty-value">{item.qty}</span>
        <button
          className="qty-btn"
          onClick={() => dispatch({ type: INCREASE_QTY, payload: item.id })}
          aria-label="Tăng"
        >
          +
        </button>
      </div>

      <button
        className="btn-remove"
        onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: item.id })}
        aria-label="Xóa"
      >
        ✕
      </button>
    </li>
  );
}
