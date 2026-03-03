import ProductCard from './ProductCard'
import './ProductList.css'

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} name={p.name} price={p.price} image={p.image} />
      ))}
    </div>
  )
}

export default ProductList
