import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  FiShoppingCart,
  FiUser,
  FiPackage,
  FiGrid,
} from "react-icons/fi";

import "./Navbar.css";

function Navbar() {
  const {
    isLoggedIn,
    isAdmin,
    logout,
    user,
  } = useAuth();

  const [openProfile, setOpenProfile] =
    useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpenProfile(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          MyShop
        </Link>

        {/* NAV LINKS */}
        <div className="nav-links">
          <Link to="/">Home</Link>

          {isLoggedIn && (
            <>
              <Link to="/cart">
                <FiShoppingCart />
                Cart
              </Link>

              <Link to="/orders">
                <FiPackage />
                Orders
              </Link>

              {isAdmin && (
                <Link to="/admin">
                  <FiGrid />
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        {/* AUTH SECTION */}
        <div className="auth-section">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="profile-wrapper">
              {/* PROFILE BUTTON */}
              <div
                className="user-badge"
                onClick={() =>
                  setOpenProfile((prev) => !prev)
                }
              >
                <div className="avatar">
                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span className="username">
                  {user?.name}
                </span>
              </div>

              {/* DROPDOWN */}
              {openProfile && (
                <div className="profile-dropdown">
                  <Link
                    to="/profile"
                    onClick={() =>
                      setOpenProfile(false)
                    }
                  >
                    <FiUser />
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() =>
                      setOpenProfile(false)
                    }
                  >
                    <FiPackage />
                    My Orders
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() =>
                      setOpenProfile(false)
                    }
                  >
                    <FiShoppingCart />
                    Cart
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() =>
                        setOpenProfile(false)
                      }
                    >
                      <FiGrid />
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;