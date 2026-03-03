import './ProductCard.css'

function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={image}
          alt={name}
          className="product-card__image"
        />
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          {price.toLocaleString('vi-VN')}₫
        </p>
        <button className="product-card__btn">Add to cart</button>
      </div>
    </div>
  )
}

export default ProductCard
