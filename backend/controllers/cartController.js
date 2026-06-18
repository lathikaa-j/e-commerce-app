const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity: 1,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    // Remove cart items whose product no longer exists
    const invalidItems = cartItems.filter(
      (item) => !item.product
    );

    if (invalidItems.length > 0) {
      await Cart.deleteMany({
        _id: {
          $in: invalidItems.map(
            (item) => item._id
          ),
        },
      });
    }

    const validItems = cartItems.filter(
      (item) => item.product
    );

    res.json(validItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    cartItem.quantity += 1;

    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;

      await cartItem.save();

      return res.json(cartItem);
    }

    await cartItem.deleteOne();

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await cartItem.deleteOne();

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.json({
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
};