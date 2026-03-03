import { PRODUCTS } from '../../data/products';
import ProductCard from './ProductCard';

export default function ProductList() {
  return (
    <section className="product-section">
      <h2 className="section-title">🛍️ Sản phẩm</h2>
      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
