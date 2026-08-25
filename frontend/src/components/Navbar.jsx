import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

import "./Navbar.css";

function Navbar() {
  const { cartCount } = useCart();

  return (
    <>
      <header className="amazon-navbar">

        {/* Logo */}
        <div className="nav-logo">
          <Link to="/">
            ShopEase
          </Link>
        </div>

        {/* Delivery */}
        <div className="nav-location">
          <span>📍</span>

          <div>
            <small>Deliver to</small>
            <strong>India</strong>
          </div>
        </div>

        {/* Search */}
        <div className="nav-search">

          <select>
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
            <option>Beauty</option>
          </select>

          <input
            type="text"
            placeholder="Search ShopEase"
          />

          <button>
            🔍
          </button>

        </div>

        {/* Account */}
        <Link
          to="/login"
          className="nav-account"
        >
          <small>Hello, sign in</small>
          <strong>Account & Lists</strong>
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          className="nav-orders"
        >
          <small>Returns</small>
          <strong>& Orders</strong>
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className="nav-cart"
        >
          <span className="cart-icon">
            🛒
          </span>

          <span className="cart-count">
            {cartCount}
          </span>

          <strong>Cart</strong>
        </Link>

      </header>

      {/* Category navigation */}
      <nav className="category-nav">

        <Link to="/">
          ☰ All
        </Link>

        <Link to="/deals">
          Today's Deals
        </Link>

        <Link to="/products">
          Electronics
        </Link>

        <Link to="/products">
          Fashion
        </Link>

        <Link to="/products">
          Home
        </Link>

        <Link to="/products">
          Beauty
        </Link>

        <Link to="/products">
          Sports
        </Link>

      </nav>
    </>
  );
}

export default Navbar;