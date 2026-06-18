import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { token } = useAuth();

  const handleAddToCart = async () => {
    try {
      await API.post(
        "/cart",
        {
          productId: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product added to cart");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(
          `/products/${id}`
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);

        setError(
          "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">
        <h2>Loading Product...</h2>
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

  if (!product) {
    return (
      <div className="error-state">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-details-card">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="product-info">
          <span className="product-category">
            {product.category}
          </span>

          <h1 className="product-title">
            {product.title}
          </h1>

          <div className="product-price">
            ₹{product.price}
          </div>

          <div className="product-stock">
            In Stock ({product.stock})
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <button
            onClick={handleAddToCart}
            className="add-cart-btn"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;