import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'
import { NotificationProvider } from './NotificationContext'
import { ProductProvider } from './ProductContext'

export default function AppProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>{children}</CartProvider>
        </ProductProvider>
      </AuthProvider>
    </NotificationProvider>
  )
}
