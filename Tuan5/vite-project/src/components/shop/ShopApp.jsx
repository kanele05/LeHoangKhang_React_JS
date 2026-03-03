// Entry point cho Bài 3
import { CartProvider } from '../../context/CartContext';
import ProductList from './ProductList';
import Cart from './Cart';
import './Shop.css';

export default function ShopApp() {
  return (
    <CartProvider>
      {/*
        Cây component:
          ShopApp
            └─ CartProvider  ← global state (items, dispatch)
                 ├─ ProductList → ProductCard  (dispatch ADD_TO_CART)
                 └─ Cart        → CartItem     (dispatch INCREASE/DECREASE/REMOVE)
        Không có props items/dispatch nào truyền giữa các cấp!
      */}
      <div className="shop-layout">
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}
