const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// =========================
// USER ROUTES
// =========================

// Create order
router.post("/", authMiddleware, createOrder);

// Get logged-in user's orders
router.get("/my-orders", authMiddleware, getMyOrders);

// Get single order (user or admin access handled in controller)
router.get("/:id", authMiddleware, getOrderById);


// =========================
// ADMIN ROUTES
// =========================

// Get all orders (ADMIN ONLY)
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// Update order status (ADMIN ONLY)
router.put(
  "/admin/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;