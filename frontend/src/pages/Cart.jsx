import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import "./Cart.css";

function Cart() {
  const {
    cart = [],
    cartTotal = 0,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Shopping Cart is Empty</h1>

        <p>Add some products to your cart.</p>

        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* LEFT SIDE - CART PRODUCTS */}
      <div className="cart-products">

        <h1>Shopping Cart</h1>

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>

            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />

            {/* Product Information */}
            <div className="cart-item-info">

              <h2>{item.name}</h2>

              <p>
                ⭐ {item.rating || "No rating"}
              </p>

              <strong>
                ₹{Number(item.price || 0).toLocaleString("en-IN")}
              </strong>

              {/* Quantity */}
              <div className="quantity-controls">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </button>

                <span>
                  {item.quantity || 1}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>

              </div>

              {/* Delete */}
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div className="cart-summary">

        <h2>Order Summary</h2>

        <hr />

        <p>
          Items: {cart.length}
        </p>

        <h2>
          Total: ₹{Number(cartTotal || 0).toLocaleString("en-IN")}
        </h2>

        <Link to="/checkout" className="checkout-button">
  Proceed to Buy
</Link>

      </div>

    </div>
  );
}

export default Cart;