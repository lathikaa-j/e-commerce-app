import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">
            MyShop
          </h2>

          <p>
            Premium shopping experience
            with modern design and
            secure checkout.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/">
            Home
          </Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/admin">
            Admin
          </Link>
        </div>

        <div className="footer-info">
          <h4>About</h4>

          <p>
            Built using MERN Stack,
            React, Express, MongoDB,
            Node.js and JWT
            Authentication.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 MyShop. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;