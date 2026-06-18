import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import API from "../services/api";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/orders/my-orders"
      );

      setOrdersCount(res.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="profile-loading">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="profile-layout">
      {/* LEFT SIDEBAR */}
      <div className="profile-sidebar">
        <div className="avatar">
          {user?.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <h3>{user?.name}</h3>

        <p>{user?.email}</p>

        <span
          className={
            user?.isAdmin
              ? "badge admin"
              : "badge user"
          }
        >
          {user?.isAdmin
            ? "Admin"
            : "User"}
        </span>

        <div className="sidebar-links">
          <a href="/orders">My Orders</a>
          <a href="/cart">Cart</a>
          <a href="/">Shop</a>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="profile-content">
        <h2>Account Overview</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{ordersCount}</h3>
            <p>Orders</p>
          </div>

          <div className="stat-card">
            <h3>
              {user?.isAdmin ? "∞" : "—"}
            </h3>
            <p>Access Level</p>
          </div>

          <div className="stat-card">
            <h3>Active</h3>
            <p>Status</p>
          </div>
        </div>

        <div className="info-box">
          <h3>Account Details</h3>

          <div className="info-row">
            <span>Name</span>
            <span>{user?.name}</span>
          </div>

          <div className="info-row">
            <span>Email</span>
            <span>{user?.email}</span>
          </div>

          <div className="info-row">
            <span>Role</span>
            <span>
              {user?.isAdmin
                ? "Admin"
                : "Customer"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;