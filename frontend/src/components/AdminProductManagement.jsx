import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";
import "./AdminProductManagement.css";

function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "electronics",
    image: "",
    stock: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await API.get(
        "/products?limit=all"
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const resetForm = () => {
    setEditingProduct(null);

    setFormData({
      title: "",
      description: "",
      price: "",
      category: "electronics",
      image: "",
      stock: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await API.put(
          `/products/${editingProduct._id}`,
          formData
        );

        toast.success(
          "Product updated successfully"
        );
      } else {
        await API.post(
          "/products",
          formData
        );

        toast.success(
          "Product added successfully"
        );
      }

      await fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to save product"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      title: product.title,
      description:
        product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    productId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/products/${productId}`
      );

      toast.success(
        "Product deleted successfully"
      );

      fetchProducts();
    } catch (err) {
      console.log(err);

      toast.error(
        "Failed to delete product"
      );
    }
  };

  return (
    <div className="product-admin-section">
      <h2>
        Product Management
      </h2>

      <form
        onSubmit={handleSubmit}
        className="product-form"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={
            formData.category
          }
          onChange={handleChange}
        >
          <option value="electronics">
            Electronics
          </option>

          <option value="fashion">
            Fashion
          </option>

          <option value="books">
            Books
          </option>

          <option value="gaming">
            Gaming
          </option>

          <option value="accessories">
            Accessories
          </option>
        </select>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button
            className="primary-btn"
            type="submit"
          >
            {editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="products-table">
        <div className="table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>
            No products available.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="table-row"
            >
              <img
                src={product.image}
                alt={product.title}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/60";
                }}
              />

              <span>
                {product.title}
              </span>

              <span>
                {product.category}
              </span>

              <span>
                ₹{product.price}
              </span>

              <span>
                {product.stock}
              </span>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(
                      product
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminProductManagement;