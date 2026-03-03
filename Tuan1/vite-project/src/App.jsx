import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard'
import Button from './components/Button'
import Alert from './components/Alert'
import LoginForm from './components/LoginForm'
import ProductList from './components/ProductList'

const products = [
  {
    id: 1,
    name: 'Áo thun Uniqlo',
    price: 299000,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
  {
    id: 2,
    name: 'Giày Nike Air Max',
    price: 2490000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  },
  {
    id: 3,
    name: 'Balo Laptop 15"',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
  },
  {
    id: 4,
    name: 'Tai nghe Sony WH-1000XM5',
    price: 6990000,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400',
  },
  {
    id: 5,
    name: 'Đồng hồ Casio',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
  },
  {
    id: 6,
    name: 'Kính mát Ray-Ban',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
  },
]

function App() {
  const [alertType, setAlertType] = useState(null)

  return (
    <div style={{ padding: '40px' }}>

      {/* Bài 5 – Responsive Product List */}
      <h2 style={{ marginBottom: '16px' }}>Bài 5 – Responsive Product List</h2>
      <ProductList products={products} />

      <hr style={{ margin: '40px 0' }} />

      {/* Bài 4 – Login Form
      <h2 style={{ marginBottom: '16px' }}>Bài 4 – Login Form</h2>
      <LoginForm />

      <hr style={{ margin: '40px 0' }} /> */}

      {/* Bài 3 – Alert / Notification
      <h2 style={{ marginBottom: '16px' }}>Bài 3 – Alert / Notification</h2>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Button type="success" onClick={() => setAlertType('success')}>Success</Button>
        <Button type="warning" onClick={() => setAlertType('warning')}>Warning</Button>
        <Button type="danger" onClick={() => setAlertType('error')}>Error</Button>
      </div>
      <Alert type={alertType} />

      <hr style={{ margin: '40px 0' }} /> */}

      {/* Bài 2 – Button component
      <h2 style={{ marginBottom: '16px' }}>Bài 2 – Button component</h2>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
        <Button type="primary">Primary</Button>
        <Button type="danger">Danger</Button>
        <Button type="success">Success</Button>
      </div> */}

      {/* Bài 1 – ProductCard
      <h2 style={{ marginBottom: '16px' }}>Bài 1 – Product Card</h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {products.map((p) => (
          <ProductCard key={p.id} name={p.name} price={p.price} image={p.image} />
        ))}
      </div> */}
    </div>
  )
}

export default App
