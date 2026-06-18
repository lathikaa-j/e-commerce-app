import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./MyOrders.css";

function MyOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";

      case "Processing":
        return "status-processing";

      case "Shipped":
        return "status-shipped";

      case "Delivered":
        return "status-delivered";

      default:
        return "status-pending";
    }
  };

  if (loading) {
    return (
      <div className="loading-orders">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-orders">
        <h2>{error}</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No Orders Found</h2>
        <p>
          Start shopping to place your first
          order.
        </p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card"
        >
          <div className="order-header">
            <div className="order-id">
              Order #
              {order._id.slice(-8)}
            </div>

            <div
              className={`status-badge ${getStatusClass(
                order.status
              )}`}
            >
              {order.status}
            </div>
          </div>

          <div className="order-details">
            <div className="detail-box">
              <h4>Total Amount</h4>
              <p>₹{order.totalPrice}</p>
            </div>

            <div className="detail-box">
              <h4>Ordered On</h4>
              <p>
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="detail-box">
              <h4>Shipping Address</h4>
              <p>
                {order.shippingAddress}
              </p>
            </div>
          </div>

          <div className="products-section">
            <h3 className="products-title">
              Ordered Products
            </h3>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="product-item"
              >
                <div>
                  <div className="product-name">
                    {
                      item.product
                        ?.title
                    }
                  </div>

                  <div className="product-meta">
                    Qty:{" "}
                    {item.quantity}
                  </div>
                </div>

                <div>
                  ₹
                  {
                    item.product
                      ?.price
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;