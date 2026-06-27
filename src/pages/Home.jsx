import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";

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

  return (
    <Layout>

      {/* HERO */}

      <section
        style={{
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 8%",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            flex: "1",
            minWidth: "320px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#D4AF37",
              color: "#111",
              padding: "10px 22px",
              borderRadius: "40px",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            Premium Electronics Store
          </span>

          <h1
            style={{
              fontSize: "60px",
              color: "white",
              lineHeight: "1.15",
              marginBottom: "20px",
            }}
          >
            Upgrade Your
            <br />

            <span
              style={{
                color: "#D4AF37",
              }}
            >
              Digital Lifestyle
            </span>
          </h1>

          <p
            style={{
              color: "#CBD5E1",
              fontSize: "18px",
              maxWidth: "550px",
              lineHeight: "30px",
            }}
          >
            Shop the latest smartphones, laptops, gaming accessories,
            headphones, smart watches and much more with trusted quality and
            unbeatable prices.
          </p>

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/products")}
              style={{
                background: "#D4AF37",
                color: "#111",
                border: "none",
                padding: "16px 36px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/products")}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid #D4AF37",
                padding: "16px 36px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "17px",
              }}
            >
              Explore
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "60px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ color: "#D4AF37", margin: 0 }}>500+</h2>
              <span style={{ color: "#ddd" }}>Products</span>
            </div>

            <div>
              <h2 style={{ color: "#D4AF37", margin: 0 }}>5K+</h2>
              <span style={{ color: "#ddd" }}>Customers</span>
            </div>

            <div>
              <h2 style={{ color: "#D4AF37", margin: 0 }}>24/7</h2>
              <span style={{ color: "#ddd" }}>Support</span>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: "320px",
          }}
        >
          <img
            src="/images/hero.png"
            alt="Hero"
            style={{
              width: "100%",
              maxWidth: "550px",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,.5))",
            }}
          />
        </div>
      </section>

      {/* WHY US */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "70px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          padding: "0 20px",
        }}
      >
        {[
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
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "18px",
              boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "50px" }}>{item.icon}</div>

            <h3
              style={{
                marginTop: "20px",
                color: "#111827",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#777",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}

      <section
        style={{
          maxWidth: "1300px",
          margin: "80px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Featured Products
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "45px",
          }}
        >
          Discover our latest collection
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "30px",
          }}
        >
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

      <section
        style={{
          background: "#111827",
          color: "white",
          textAlign: "center",
          padding: "80px 20px",
          marginTop: "90px",
        }}
      >
        <h2
          style={{
            fontSize: "44px",
            marginBottom: "15px",
          }}
        >
          Ready to Upgrade?
        </h2>

        <p
          style={{
            color: "#d1d5db",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "30px",
          }}
        >
          Shop premium gadgets with trusted quality and affordable prices.
        </p>

        <button
          onClick={() => navigate("/products")}
          style={{
            marginTop: "35px",
            background: "#D4AF37",
            color: "#111",
            border: "none",
            padding: "15px 35px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          Start Shopping
        </button>
      </section>

    </Layout>
  );
}

export default Home;