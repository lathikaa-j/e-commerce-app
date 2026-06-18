import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/products", {
        params: {
          search,
          category,
          sort,
          page,
          limit: 8,
        },
      });

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
      setError("Something went wrong while loading products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort, page]);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h2>Loading Products...</h2>
        <p style={{ color: "#64748b" }}>
          Please wait while we fetch products.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "80px 20px",
        }}
      >
        <h2 style={{ color: "crimson" }}>{error}</h2>

        <button
          onClick={fetchProducts}
          className="primary-btn"
          style={{ marginTop: "15px" }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "20px",
          }}
          className="gradient-text"
        >
          Shop Smarter. Live Better.
        </h1>

        <p
          style={{
            maxWidth: "650px",
            margin: "auto",
            color: "#64748b",
            fontSize: "1.1rem",
            lineHeight: "1.8",
          }}
        >
          Explore a curated collection of premium products
          chosen for quality, performance, and everyday
          convenience. From cutting-edge gadgets to
          lifestyle essentials, find everything you need
          in one place.
        </p>
        <button
          className="primary-btn"
          style={{
            marginTop: "30px",
          }}
          onClick={() => {
            document
              .getElementById("products-section")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          Explore Collection
        </button>
      </section>

      {/* PRODUCTS SECTION */}
      <section
        id="products-section"
        style={{
          width: "min(1000px, 92%)",
          margin: "auto",
          paddingBottom: "60px",
        }}
      >
        {/* FILTERS */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              minWidth: "260px",
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
            }}
          >
            <option value="">All Categories</option>
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

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
            }}
          >
            <option value="">
              Newest First
            </option>

            <option value="low-high">
              Price: Low → High
            </option>

            <option value="high-low">
              Price: High → Low
            </option>
          </select>
        </div>

        {/* EMPTY STATE */}
        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <h2>No Products Found</h2>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px",
              }}
            >
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* PRODUCT GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
              }}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>

            {/* PAGINATION */}
            <div
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <button
                className="primary-btn"
                disabled={page === 1}
                onClick={() =>
                  setPage(page - 1)
                }
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                className="primary-btn"
                disabled={
                  page === totalPages
                }
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Home;