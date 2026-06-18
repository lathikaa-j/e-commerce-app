import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./Cart.css";

function Cart() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Cart Data:", res.data);

      setCartItems(res.data);
    } catch (error) {
      console.log(error);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const handleIncrease = async (cartId) => {
    try {
      await API.put(
        `/cart/increase/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async (cartId) => {
    try {
      await API.put(
        `/cart/decrease/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await API.delete(`/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  const validCartItems = cartItems.filter(
    (item) => item.product
  );

  const totalAmount = validCartItems.reduce(
    (total, item) =>
      total +
      (item.product?.price || 0) *
        item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        Shopping Cart
      </h1>

      {validCartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart Is Empty</h2>
          <p>
            Looks like you haven't added
            anything yet.
          </p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {validCartItems.map((item) => (
              <div
                key={item._id}
                className="cart-card"
              >
                <img
                  src={item.product?.image}
                  alt={item.product?.title}
                  className="cart-image"
                />

                <div className="cart-info">
                  <h3>
                    {item.product?.title}
                  </h3>

                  <div className="cart-price">
                    ₹{item.product?.price}
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleDecrease(item._id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        handleIncrease(item._id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p>
                    Subtotal: ₹
                    {(item.product?.price || 0) *
                      item.quantity}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleRemove(item._id)
                    }
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>

              <span>
                {validCartItems.length}
              </span>
            </div>

            <div className="summary-row summary-total">
              <span>Total</span>

              <span>
                ₹{totalAmount}
              </span>
            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;