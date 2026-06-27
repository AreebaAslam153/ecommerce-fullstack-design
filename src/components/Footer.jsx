function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        color: "white",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 30px 30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}

          <div>
            <h2
              style={{
                color: "#D4AF37",
                marginBottom: "15px",
              }}
            >
              ShopEase
            </h2>

            <p
              style={{
                color: "#D1D5DB",
                lineHeight: "28px",
              }}
            >
              Your trusted destination for premium electronics,
              gadgets and accessories at unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "15px",
              }}
            >
              Quick Links
            </h3>

            <p>Home</p>
            <p>Products</p>
            <p>Cart</p>
            <p>Login</p>
          </div>

          {/* Customer Support */}

          <div>
            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "15px",
              }}
            >
              Customer Support
            </h3>

            <p>Fast Delivery</p>
            <p>Secure Payment</p>
            <p>Easy Returns</p>
            <p>24/7 Support</p>
          </div>

          {/* Contact */}

          <div>
            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "15px",
              }}
            >
              Contact
            </h3>

            <p>📧 support@shopease.com</p>
            <p>📞 +92 300 1234567</p>
            <p>📍 Multan, Pakistan</p>
          </div>
        </div>

        <hr
          style={{
            border: "1px solid #374151",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "25px",
            color: "#9CA3AF",
            fontSize: "15px",
          }}
        >
          <span>
            © 2026 ShopEase. All Rights Reserved.
          </span>

          <span>
            Developed with ❤️ using React & Firebase
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;