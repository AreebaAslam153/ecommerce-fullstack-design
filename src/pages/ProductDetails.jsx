import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Loading Product...
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });
  };

  return (
    <Layout>
      <div
        style={{
          maxWidth: "1300px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Product Image */}

          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,.08)",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "450px",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Product Details */}

          <div>
            <span
              style={{
                background: "#D4AF37",
                color: "#111",
                padding: "8px 18px",
                borderRadius: "30px",
                fontWeight: "600",
              }}
            >
              ⭐ Best Seller
            </span>

            <h1
              style={{
                marginTop: "20px",
                fontSize: "48px",
                color: "#111827",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                color: "#F59E0B",
                fontSize: "20px",
              }}
            >
              ⭐⭐⭐⭐⭐
              <span
                style={{
                  color: "#666",
                  fontSize: "16px",
                }}
              >
                (4.9 Reviews)
              </span>
            </div>

            <h2
              style={{
                marginTop: "30px",
                color: "#D4AF37",
                fontSize: "42px",
              }}
            >
              ${product.price}
            </h2>

            <p
              style={{
                color: "#555",
                lineHeight: "32px",
                marginTop: "25px",
                fontSize: "18px",
              }}
            >
              Experience premium quality electronics designed for performance,
              durability, and everyday convenience. Enjoy fast delivery,
              warranty support, and trusted quality.
            </p>

            {/* Quantity */}

            <div
              style={{
                marginTop: "35px",
              }}
            >
              <h3>Quantity</h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    quantity > 1 && setQuantity(quantity - 1)
                  }
                  style={{
                    width: "45px",
                    height: "45px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "22px",
                    background: "#eee",
                  }}
                >
                  -
                </button>

                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "45px",
                    height: "45px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "22px",
                    background: "#eee",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "45px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleAddToCart}
                style={{
                  background: "#D4AF37",
                  color: "#111",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                style={{
                  background: "#111827",
                  color: "white",
                  border: "none",
                  padding: "18px 40px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "17px",
                }}
              >
                Buy Now
              </button>
            </div>

            <div
              style={{
                marginTop: "45px",
                background: "#F9FAFB",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <p>✅ Free Delivery Across Pakistan</p>
              <p>🔒 Secure Payments</p>
              <p>↩️ 7-Day Easy Return</p>
              <p>🏆 1 Year Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;