import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Home.css";

function Home() {
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
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>{error}</h2>
        <p>Make sure your FastAPI backend is running.</p>
      </div>
    );
  }

  return (
    <div className="home-page">

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopEase</h1>

          <p>
            Discover amazing products at great prices.
          </p>

          <button>
            Shop Now
          </button>
        </div>
      </section>

      <section className="products-section">

        <div className="section-header">
          <h2>Popular Products</h2>
        </div>

        {products.length === 0 ? (
          <p className="no-products">
            No products available.
          </p>
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

    </div>
  );
}

export default Home;