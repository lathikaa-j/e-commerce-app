const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      image,
      stock,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      sort,
    } = req.query;
    const numericLimit =
    limit === "all"
    ? 100000
    : Number(limit);

    const query = {};

    // 🔍 SEARCH (title)
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // 🧾 FILTER (category)
    if (category) {
      query.category = category;
    }

    // 🔢 SORTING
    let sortOption = {};

    if (sort === "low-high") {
      sortOption.price = 1;
    } else if (sort === "high-low") {
      sortOption.price = -1;
    } else {
      sortOption.createdAt = -1;
    }

    // 📄 PAGINATION
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(numericLimit);

    const total = await Product.countDocuments(query);

    res.json({
    products,
    totalPages: Math.ceil(total / numericLimit),
    currentPage: Number(page),
    totalProducts: total,
  });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};