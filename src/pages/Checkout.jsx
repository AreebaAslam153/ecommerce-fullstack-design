import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { auth, database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import { placeOrder } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const loadCustomer = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const snapshot = await get(ref(database, `users/${user.uid}`));

      if (snapshot.exists()) {
        setCustomer(snapshot.val());
      }
    };

    loadCustomer();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const handleSubmit = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      userId: auth.currentUser.uid,
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      items: cartItems,
      total,
      orderDate: new Date().toLocaleString(),
      status: "Pending",
    };

    const success = await placeOrder(order);

    if (success) {
      clearCart();
      alert("Order Placed Successfully!");
      navigate("/");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>

      {/* HERO */}

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
            fontSize: "48px",
            marginBottom: "15px",
          }}
        >
          Secure Checkout
        </h1>

        <p
          style={{
            color: "#D1D5DB",
            fontSize: "18px",
          }}
        >
          Complete your purchase safely and securely.
        </p>
      </section>

      <div className="checkout-container">
        {/* CUSTOMER INFO */}

        <div className="checkout-left">
          <h2
            style={{
              color: "#111827",
              marginBottom: "30px",
            }}
          >
            👤 Customer Information
          </h2>

          <div style={{ marginBottom: "20px" }}>
            <label>Full Name</label>

            <input
              value={customer.name}
              readOnly
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Email Address</label>

            <input
              value={customer.email}
              readOnly
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Phone Number</label>

            <input
              value={customer.phone}
              readOnly
              style={inputStyle}
            />
          </div>

          <div>
            <label>Delivery Address</label>

            <textarea
              rows="4"
              value={customer.address}
              readOnly
              style={{
                ...inputStyle,
                resize: "none",
                height: "120px",
              }}
            />
          </div>
        </div>

        {/* ORDER SUMMARY */}

        <div className="checkout-right">
          <h2
            style={{
              color: "#D4AF37",
              marginBottom: "30px",
            }}
          >
            🧾 Order Summary
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
            }}
          >
            <span>Total Items</span>

            <strong>{totalItems}</strong>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>Shipping</span>

            <strong
              style={{
                color: "#22C55E",
              }}
            >
              FREE
            </strong>
          </div>

          <hr
            style={{
              borderColor: "#374151",
              margin: "25px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <span>Total Amount</span>

            <strong
              style={{
                color: "#D4AF37",
                fontSize: "28px",
              }}
            >
              ${total}
            </strong>
          </div>

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                color: "#D1D5DB",
                marginBottom: "10px",
              }}
            >
              Payment Method
            </p>

            <div
              style={{
                background: "#1F2937",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              💳 Cash on Delivery
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#D4AF37",
              color: "#111827",
              border: "none",
              padding: "18px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "17px",
              transition: ".3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "#C9A227")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "#D4AF37")
            }
          >
            ✔ Place Order
          </button>
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  borderRadius: "12px",
  border: "1px solid #E5E7EB",
  background: "#F9FAFB",
  fontSize: "16px",
  boxSizing: "border-box",
};

export default Checkout;