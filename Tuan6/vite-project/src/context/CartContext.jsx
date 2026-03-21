import { createContext, useContext, useReducer, useEffect } from 'react';

// ─── Action Types ─────────────────────────────────────────────────────────────
export const ADD_TO_CART    = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QTY   = 'INCREASE_QTY';
export const DECREASE_QTY   = 'DECREASE_QTY';
export const CLEAR_CART     = 'CLEAR_CART';

// ─── localStorage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'shopping_cart_v1';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* ignore */ }
}

// ─── Pure Reducer ─────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const exists = state.find((i) => i.id === action.payload.id);
      if (exists) {
        // Nếu đã có → tăng số lượng
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }

    case REMOVE_FROM_CART:
      return state.filter((i) => i.id !== action.payload);

    case INCREASE_QTY:
      return state.map((i) =>
        i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
      );

    case DECREASE_QTY:
      return state
        .map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0); // xóa khi qty về 0

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// ─── Selectors (pure functions, không cần hook) ───────────────────────────────
export const selectTotalItems = (items) =>
  items.reduce((sum, i) => sum + i.qty, 0);

export const selectTotalPrice = (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0);

export const selectIsInCart = (items, productId) =>
  items.some((i) => i.id === productId);

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(
    cartReducer,
    [],            // initialArg
    () => loadFromStorage() // lazy init từ localStorage (BONUS)
  );

  // BONUS: Sync to localStorage mỗi khi items thay đổi
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  return (
    <CartContext.Provider value={{ items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
