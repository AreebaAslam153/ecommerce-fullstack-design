import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  const navigate = useNavigate();

  return (
    <Layout>
      {/* Header */}

      <section
        style={{
          background: "linear-gradient(135deg,#111827,#1E293B)",
          color: "white",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "46px",
            marginBottom: "15px",
          }}
        >
          Shopping Cart
        </h1>

        <p
          style={{
            color: "#D1D5DB",
            fontSize: "18px",
          }}
        >
          Review your items before checkout
        </p>
      </section>

      <div
        style={{
          maxWidth: "1350px",
          margin: "50px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "35px",
        }}
      >
        {/* Cart Items */}

        <div>
          {cartItems.length === 0 ? (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "80px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <h2>Your Cart is Empty 🛒</h2>

              <p style={{ color: "#777" }}>
                Start shopping to add amazing products.
              </p>

              <button
                onClick={() => navigate("/products")}
                style={{
                  marginTop: "30px",
                  background: "#D4AF37",
                  color: "#111",
                  border: "none",
                  padding: "15px 35px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "18px",
                  padding: "20px",
                  marginBottom: "25px",
                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "contain",
                    }}
                  />

                  <div>
                    <h2
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      {item.name}
                    </h2>

                    <h3
                      style={{
                        color: "#D4AF37",
                      }}
                    >
                      ${item.price}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                      }}
                    >
                      Quantity : {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}

        {cartItems.length > 0 && (
          <div
            style={{
              background: "#111827",
              color: "white",
              borderRadius: "20px",
              padding: "35px",
              height: "fit-content",
              position: "sticky",
              top: "25px",
            }}
          >
            <h2
              style={{
                marginBottom: "30px",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span>Items</span>

              <strong>{cartItems.length}</strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span>Shipping</span>

              <strong style={{ color: "#22C55E" }}>
                Free
              </strong>
            </div>

            <hr
              style={{
                margin: "25px 0",
                borderColor: "#374151",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "22px",
                marginBottom: "35px",
              }}
            >
              <strong>Total</strong>

              <strong
                style={{
                  color: "#D4AF37",
                }}
              >
                ${totalPrice}
              </strong>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "18px",
                background: "#D4AF37",
                color: "#111",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;