import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [placedTotal, setPlacedTotal] = useState(0);

  const placeOrder = async (e) => {
    e.preventDefault();

    setError("");

    // Check cart
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Check fields
    if (
      !customerName.trim() ||
      !mobile.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pinCode.trim()
    ) {
      setError("Please fill in all delivery information.");
      return;
    }

    // Check mobile
    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Check PIN
    if (!/^[0-9]{6}$/.test(pinCode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    try {
      setLoading(true);

      // Convert cart into backend order items
      const items = cart.map((item) => ({
        product_id: Number(item.id),
        quantity: Number(item.quantity || 1),
      }));

      const orderData = {
        customer_name: customerName.trim(),
        mobile: mobile.trim(),
        address: address.trim(),
        city: city.trim(),
        pin_code: pinCode.trim(),
        payment_method: paymentMethod,
        items: items,
      };

      console.log("ORDER DATA:", orderData);

      const response = await fetch(
        "http://127.0.0.1:8000/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      console.log("ORDER RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to place order"
        );
      }

      // Save order information
      setOrderId(data.order_id);
      setPlacedTotal(Number(data.total));

      // Empty cart after successful order
      if (clearCart) {
        clearCart();
      }

      setSuccess(true);
      setLoading(false);

    } catch (err) {
      console.error("ORDER ERROR:", err);

      setError(
        err.message || "Unable to place order."
      );

      setLoading(false);
    }
  };

  // =====================================================
  // SUCCESS PAGE
  // =====================================================

  if (success) {
    return (
      <div className="checkout-success">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for shopping with ShopEase.
          </p>

          <p>
            Your Order ID:
            <strong> #{orderId}</strong>
          </p>

          <p>
            Total:
            <strong>
              ₹{placedTotal.toLocaleString("en-IN")}
            </strong>
          </p>

          <button
            onClick={() => navigate("/orders")}
            className="continue-shopping"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="continue-shopping"
          >
            Continue Shopping
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // CHECKOUT PAGE
  // =====================================================

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        <h1>
          Checkout
        </h1>

        {error && (
          <div className="checkout-error">
            {error}
          </div>
        )}

        <form onSubmit={placeOrder}>

          {/* DELIVERY INFORMATION */}

          <div className="checkout-section">

            <h2>
              Delivery Information
            </h2>

            <label>
              Full Name
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              placeholder="Enter your full name"
            />

            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value)
              }
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />

            <label>
              Address
            </label>

            <textarea
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter your delivery address"
              rows="4"
            />

            <label>
              City
            </label>

            <input
              type="text"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              placeholder="Enter your city"
            />

            <label>
              PIN Code
            </label>

            <input
              type="text"
              value={pinCode}
              onChange={(e) =>
                setPinCode(e.target.value)
              }
              placeholder="Enter 6-digit PIN code"
              maxLength="6"
            />

          </div>


          {/* PAYMENT */}

          <div className="checkout-section">

            <h2>
              Payment Method
            </h2>

            <label className="payment-option">

              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Cash on Delivery
            </label>


            <label className="payment-option">

              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              UPI
            </label>


            <label className="payment-option">

              <input
                type="radio"
                value="Card"
                checked={paymentMethod === "Card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Credit / Debit Card
            </label>

          </div>


          {/* ORDER SUMMARY */}

          <div className="checkout-section">

            <h2>
              Order Summary
            </h2>

            <p>
              Products: {cart.length}
            </p>

            <p>
              Items:
              {" "}
              {cart.reduce(
                (total, item) =>
                  total + Number(item.quantity || 1),
                0
              )}
            </p>

            <h2>
              Total: ₹
              {Number(cartTotal).toLocaleString("en-IN")}
            </h2>

          </div>


          {/* PLACE ORDER */}

          <button
            type="submit"
            className="place-order-button"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : `Place Order ₹${Number(cartTotal).toLocaleString("en-IN")}`}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;