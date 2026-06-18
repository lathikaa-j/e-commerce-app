import { useEffect, useState } from "react";
import API from "../services/api";

import AdminProductManagement from "../components/AdminProductManagement";

import "./AdminDashboard.css";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [productsCount, setProductsCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res =
        await API.get(
          "/orders/admin/all"
        );

      setOrders(res.data);
    } catch (err) {
      setError(
        "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsCount =
    async () => {
      try {
        const res =
          await API.get(
            "/products?limit=all"
          );

        setProductsCount(
          res.data.products.length
        );
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchOrders();
    fetchProductsCount();
  }, []);

  const updateStatus = async (
    orderId,
    status
  ) => {
    try {
      await API.put(
        `/orders/admin/${orderId}/status`,
        { status }
      );

    toast.success(
      `Order marked as ${status}`
    );
      fetchOrders();
    } catch (err) {
      toast.error(
      "Failed to update order status"
    );
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <h2>
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>{error}</h2>
      </div>
    );
  }

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + order.totalPrice,
      0
    );

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Pending"
    ).length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status ===
        "Delivered"
    ).length;

  return (
    <div className="admin-container">
      <h1 className="admin-title">
        Admin Dashboard
      </h1>

      {/* STATS */}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">
            Total Orders
          </div>

          <div className="stat-value">
            {orders.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Revenue
          </div>

          <div className="stat-value">
            ₹{totalRevenue}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Pending Orders
          </div>

          <div className="stat-value">
            {pendingOrders}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Delivered Orders
          </div>

          <div className="stat-value">
            {deliveredOrders}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Total Products
          </div>

          <div className="stat-value">
            {productsCount}
          </div>
        </div>
      </div>

      {/* PRODUCT MANAGEMENT */}

      <AdminProductManagement />

      {/* ORDER MANAGEMENT */}

      <div className="orders-section">
        <h2>Manage Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-state">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
            >
              <div className="order-header">
                <div>
                  <div className="order-user">
                    {
                      order.user
                        ?.name
                    }
                  </div>

                  <div className="order-email">
                    {
                      order.user
                        ?.email
                    }
                  </div>
                </div>

                <select
                  className="status-select"
                  value={
                    order.status
                  }
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    Processing
                  </option>

                  <option>
                    Shipped
                  </option>

                  <option>
                    Delivered
                  </option>
                </select>
              </div>

              <div className="products-list">
                {order.items.map(
                  (
                    item,
                    index
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="product-row"
                    >
                      <span>
                        {
                          item
                            .product
                            ?.title
                        }{" "}
                        ×{" "}
                        {
                          item.quantity
                        }
                      </span>

                      <span>
                        ₹
                        {item
                          .product
                          ?.price *
                          item.quantity}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="order-footer">
                <span>
                  Order #
                  {order._id.slice(
                    -8
                  )}
                </span>

                <span>
                  ₹
                  {
                    order.totalPrice
                  }
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;