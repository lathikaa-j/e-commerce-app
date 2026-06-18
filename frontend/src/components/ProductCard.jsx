import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <span className="category-badge">
          {product.category}
        </span>

        <h3 className="product-title">
          {product.title}
        </h3>

        <p className="product-price">
          ₹{product.price}
        </p>

        <Link
          to={`/products/${product._id}`}
          className="details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;