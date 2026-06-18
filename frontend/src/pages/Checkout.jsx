import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./Checkout.css";

function Checkout() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] =
    useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await API.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter shipping address");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await API.post(
        "/orders",
        {
          items: orderItems,
          shippingAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await API.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <h2>Loading Checkout...</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your Cart Is Empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-layout">
        <div className="shipping-card">
          <h2>Shipping Address</h2>

          <textarea
            className="shipping-textarea"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(
                e.target.value
              )
            }
            placeholder="Enter your complete shipping address..."
          />
        </div>

        <div className="summary-card">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="order-item"
            >
              <div>
                <div className="item-title">
                  {item.product.title}
                </div>

                <div className="item-qty">
                  Qty: {item.quantity}
                </div>
              </div>

              <div>
                ₹
                {item.product.price *
                  item.quantity}
              </div>
            </div>
          ))}

          <div className="total-row">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            className="place-order-btn"
            disabled={placingOrder}
            onClick={handlePlaceOrder}
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;