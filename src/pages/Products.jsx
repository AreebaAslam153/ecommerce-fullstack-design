import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg,#111827,#1E293B)",
          color: "white",
          padding: "70px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "15px",
            fontWeight: "700",
          }}
        >
          Explore Our Products
        </h1>

        <p
          style={{
            color: "#d1d5db",
            fontSize: "18px",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Discover premium electronics with unbeatable prices and trusted
          quality.
        </p>
      </section>

      <div
        style={{
          maxWidth: "1400px",
          margin: "50px auto",
          padding: "0 25px",
        }}
      >
        {/* Search */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "350px",
              padding: "16px 22px",
              borderRadius: "40px",
              border: "2px solid #D4AF37",
              outline: "none",
              fontSize: "16px",
            }}
          />

          <div
            style={{
              color: "#555",
              fontWeight: "600",
            }}
          >
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* Products */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "35px",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))
          ) : (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "100px 20px",
              }}
            >
              <h2>No Products Found 😔</h2>
              <p style={{ color: "#777" }}>
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Products;