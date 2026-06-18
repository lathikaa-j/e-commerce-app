const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.put(
  "/increase/:id",
  authMiddleware,
  increaseQuantity
);

router.put(
  "/decrease/:id",
  authMiddleware,
  decreaseQuantity
);

router.delete(
  "/clear",
  authMiddleware,
  clearCart
);

router.delete(
  "/:id",
  authMiddleware,
  removeItem
);

module.exports = router;