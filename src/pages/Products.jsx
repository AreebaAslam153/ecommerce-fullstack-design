import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";
import "../styles/Products.css";

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

      <section className="products-hero">

        <h1>Explore Our Products</h1>

        <p>
          Discover premium electronics with unbeatable prices and trusted
          quality.
        </p>

      </section>

      <div className="products-container">

        <div className="products-top">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />

          <div className="products-count">
            {filteredProducts.length} Products Found
          </div>

        </div>

        <div className="products-grid">

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
            <div className="no-products">

              <h2>No Products Found 😔</h2>

              <p>Try searching with another keyword.</p>

            </div>
          )}

        </div>

      </div>

    </Layout>
  );
}

export default Products;