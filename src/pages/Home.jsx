import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    loadProducts();
  }, []);

  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      text: "Across Pakistan",
    },
    {
      icon: "🛡️",
      title: "Secure Payments",
      text: "100% Protected",
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      text: "Trusted Brands",
    },
    {
      icon: "💬",
      title: "Customer Support",
      text: "24 Hours",
    },
  ];

  return (
    <Layout>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            Premium Electronics Store
          </span>

          <h1>
            Upgrade Your
            <br />
            <span>Digital Lifestyle</span>
          </h1>

          <p>
            Shop the latest smartphones, laptops, gaming accessories,
            headphones, smart watches and much more with trusted quality
            and unbeatable prices.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/products")}
            >
              Explore
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <h2>500+</h2>
              <span>Products</span>
            </div>

            <div>
              <h2>5K+</h2>
              <span>Customers</span>
            </div>

            <div>
              <h2>24/7</h2>
              <span>Support</span>
            </div>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="/images/hero.png"
            alt="Hero"
          />

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        {features.map((item, index) => (

          <div
            className="feature-card"
            key={index}
          >

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </div>

        ))}

      </section>

      {/* PRODUCTS */}

      <section className="featured-products">

        <h2>Featured Products</h2>

        <p>
          Discover our latest collection
        </p>

        <div className="products-grid">

          {products.slice(0, 8).map((product) => (

            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>Ready to Upgrade?</h2>

        <p>
          Shop premium gadgets with trusted quality and affordable prices.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </button>

      </section>

    </Layout>
  );
}

export default Home;