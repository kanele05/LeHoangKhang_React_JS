import {
  useCart,
  CLEAR_CART,
  selectTotalItems,
  selectTotalPrice,
} from '../../context/CartContext';
import { formatVND } from '../../data/products';
import CartItem from './CartItem';

export default function Cart() {
  const { items, dispatch } = useCart();

  // ── Selectors ──────────────────────────────────────────────────────────────
  const totalItems = selectTotalItems(items);
  const totalPrice = selectTotalPrice(items);

  return (
    <aside className="cart-panel">
      {/* Cart header */}
      <div className="cart-header">
        <h2 className="cart-title">
          🛒 Giỏ hàng
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </h2>
        {items.length > 0 && (
          <button
            className="btn-clear"
            onClick={() => dispatch({ type: CLEAR_CART })}
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Cart body */}
      {items.length === 0 ? (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛍️</span>
          <p>Giỏ hàng trống</p>
          <p className="cart-empty-sub">Thêm sản phẩm để bắt đầu</p>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>

          {/* Summary */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Số lượng</span>
              <span>{totalItems} sản phẩm</span>
            </div>
            <div className="summary-row total">
              <span>Tổng tiền</span>
              <span className="total-price">{formatVND(totalPrice)}</span>
            </div>
            <button className="btn-checkout">
              Thanh toán →
            </button>
          </div>
        </>
      )}

      {/* BONUS: localStorage badge */}
      <p className="persist-note">💾 Giỏ hàng được lưu tự động</p>
    </aside>
  );
}
