import { selector } from 'recoil'
import cartAtom from './CartAtom'

const cartTotalSelector = selector({
  key: 'cartTotalSelector',
  get: ({ get }) => {
    const cartItems = get(cartAtom)
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
})

export default cartTotalSelector