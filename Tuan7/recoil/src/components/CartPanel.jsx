import { useRecoilState, useRecoilValue } from 'recoil'
import cartAtom from '../states/CartAtom'
import cartTotalSelector from '../states/CartTotalSelector'
import useNotify from '../hooks/useNotify'

const products = [
  { id: 1, name: 'Ao thun', price: 120000 },
  { id: 2, name: 'Quan jean', price: 350000 },
  { id: 3, name: 'Giay sneaker', price: 890000 },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function CartPanel() {
  const [cartItems, setCartItems] = useRecoilState(cartAtom)
  const total = useRecoilValue(cartTotalSelector)
  const notify = useNotify()

  function handleAddToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        )
      }

      return [...prevItems, { ...product, quantity: 1 }]
    })
    notify(`Da them ${product.name} vao gio`)
  }

  function handleIncrease(itemId) {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    )
    notify('Da tang so luong san pham')
  }

  function handleDecrease(itemId) {
    const targetItem = cartItems.find((item) => item.id === itemId)

    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )

    if (targetItem && targetItem.quantity === 1) {
      notify(`Da xoa ${targetItem.name} khoi gio`)
      return
    }

    notify('Da giam so luong san pham')
  }

  return (
    <div className='panel auth-panel'>
      <h2>Cart (Gio hang)</h2>

      <div className='product-list'>
        {products.map((product) => (
          <div className='product-item' key={product.id}>
            <span>
              {product.name} - {formatCurrency(product.price)}
            </span>
            <button onClick={() => handleAddToCart(product)}>Them vao gio</button>
          </div>
        ))}
      </div>

      <ul className='cart-list'>
        {cartItems.length === 0 ? (
          <li>Gio hang dang trong.</li>
        ) : (
          cartItems.map((item) => (
            <li className='cart-item' key={item.id}>
              <span>
                {item.name} x {item.quantity} ={' '}
                {formatCurrency(item.quantity * item.price)}
              </span>
              <div className='cart-actions'>
                <button onClick={() => handleIncrease(item.id)}>+</button>
                <button onClick={() => handleDecrease(item.id)}>-</button>
              </div>
            </li>
          ))
        )}
      </ul>

      <p className='cart-total'>Tong tien: {formatCurrency(total)}</p>
    </div>
  )
}