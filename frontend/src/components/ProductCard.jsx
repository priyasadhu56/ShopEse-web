import { useCart } from "../CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* Product Information */}
      <div className="product-info">

        <h3 className="product-name">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">★</span>
          <span>{product.rating || "No rating"}</span>
        </div>

        {/* Price */}
        <div className="product-price">

          <span className="price">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>

          {product.oldPrice && (
            <span className="old-price">
              ₹{Number(product.oldPrice).toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* Discount */}
        {product.discount && (
          <div className="discount">
            {product.discount}% off
          </div>
        )}

        {/* Add to Cart */}
        <button
          className="add-cart-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;