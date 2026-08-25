import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      name: "Premium Laptop",
      price: 54999,
      oldPrice: 65999,
      discount: 17,
      rating: 4.4,
      image: "https://via.placeholder.com/500x400?text=Laptop",
      description:
        "A powerful and reliable laptop for work, study, entertainment and everyday use."
    },
    {
      id: 2,
      name: "Smartphone",
      price: 19999,
      oldPrice: 24999,
      discount: 20,
      rating: 4.3,
      image: "https://via.placeholder.com/500x400?text=Phone",
      description:
        "A modern smartphone with a beautiful display, powerful performance and long battery life."
    },
    {
      id: 3,
      name: "Smart Watch",
      price: 2999,
      oldPrice: 4999,
      discount: 40,
      rating: 4.2,
      image: "https://via.placeholder.com/500x400?text=Watch",
      description:
        "Track your fitness, notifications and daily activities with this smart watch."
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 2499,
      oldPrice: 3999,
      discount: 38,
      rating: 4.1,
      image: "https://via.placeholder.com/500x400?text=Shoes",
      description:
        "Comfortable running shoes designed for everyday walking, running and exercise."
    },
    {
      id: 5,
      name: "Wireless Headphones",
      price: 1799,
      oldPrice: 2999,
      discount: 40,
      rating: 4.4,
      image: "https://via.placeholder.com/500x400?text=Headphones",
      description:
        "Enjoy clear audio and wireless freedom with these comfortable headphones."
    }
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>

        <Link to="/">
          ← Back to ShopEase
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details">

      {/* Product Image */}

      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Information */}

      <div className="details-info">

        <h1>{product.name}</h1>

        <div className="details-rating">
          ⭐⭐⭐⭐☆ <span>{product.rating} out of 5</span>
        </div>

        <hr />

        <p className="details-description">
          {product.description}
        </p>

        <div className="details-discount">
          {product.discount}% OFF
        </div>

        <div className="details-price">
          ₹{product.price.toLocaleString("en-IN")}
        </div>

        <div className="details-old-price">
          M.R.P. ₹{product.oldPrice.toLocaleString("en-IN")}
        </div>

        <p className="delivery-text">
          🚚 FREE Delivery
        </p>

        <div className="quantity">

          <label>Quantity:</label>

          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>

        </div>

        <div className="details-buttons">

          <button className="details-cart">
            Add to Cart
          </button>

          <button className="buy-now">
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;