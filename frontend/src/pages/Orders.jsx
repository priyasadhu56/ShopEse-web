import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load orders.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <h2>Loading your orders...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-error">
          <h2>{error}</h2>
          <p>Make sure your FastAPI backend is running.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-container">

        {/* Page Header */}
        <div className="orders-title">
          <h1>Your Orders</h1>
          <p>
            View and manage all your ShopEase orders.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="no-orders">

            <div className="no-orders-icon">
              📦
            </div>

            <h2>No orders yet</h2>

            <p>
              You haven't placed any orders yet.
            </p>

            <Link
              to="/"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (

          /* Orders List */
          <div className="orders-list">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                {/* Order Header */}
                <div className="order-top">

                  <div>
                    <span className="order-label">
                      ORDER
                    </span>

                    <h2>
                      #{order.id}
                    </h2>
                  </div>

                  <div className="order-status">
                    ✓ Order Placed
                  </div>

                </div>

                <hr />

                {/* Customer Information */}
                <div className="order-information">

                  <div className="information-box">

                    <h3>
                      Delivery Information
                    </h3>

                    <p>
                      <strong>Name:</strong>{" "}
                      {order.customer_name}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {order.email}
                    </p>

                    <p>
                      <strong>Address:</strong>{" "}
                      {order.address}
                    </p>

                  </div>

                  {/* Order Amount */}
                  <div className="order-amount">

                    <span>
                      Total Amount
                    </span>

                    <strong>
                      ₹
                      {Number(order.total).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>

                {/* Order Footer */}
                <div className="order-footer">

                  <span className="delivery-message">
                    📦 Your order has been placed
                    successfully.
                  </span>

                  <div className="order-actions">

                    <button
                      className="track-button"
                      onClick={() =>
                        alert(
                          `Order #${order.id} is currently being processed.`
                        )
                      }
                    >
                      Track Order
                    </button>

                    <button
                      className="details-button"
                      onClick={() =>
                        alert(
                          `Order #${order.id}\nTotal: ₹${Number(
                            order.total
                          ).toLocaleString("en-IN")}`
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Orders;