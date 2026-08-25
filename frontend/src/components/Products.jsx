import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        console.log("PRODUCTS FROM BACKEND:", data);

        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("PRODUCT ERROR:", error);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="products-section">
        <h2>Today's Deals</h2>
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="products-section">
        <h2>Today's Deals</h2>
        <p className="products-error">{error}</p>
      </section>
    );
  }

  return (
    <section className="products-section">

      <div className="products-header">
        <h2>Today's Deals</h2>
        <span>See all</span>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <h3>No products available</h3>
          <p>Your database does not contain any products yet.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default Products;