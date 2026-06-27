import { useEffect, useState } from "react";

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        background: "#111827",
        color: "white",
        marginTop: isMobile ? "50px" : "80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "40px 18px 20px" : "60px 30px 30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: isMobile ? "25px" : "40px",
            marginBottom: isMobile ? "25px" : "40px",
          }}
        >
          {/* Brand */}

          <div>
            <h2
              style={{
                color: "#D4AF37",
                marginBottom: "12px",
                fontSize: isMobile ? "22px" : "30px",
              }}
            >
              ShopEase
            </h2>

            <p
              style={{
                color: "#D1D5DB",
                lineHeight: isMobile ? "24px" : "28px",
                fontSize: isMobile ? "14px" : "16px",
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
                marginBottom: "12px",
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              Quick Links
            </h3>

            {["Home", "Products", "Cart", "Login"].map((item) => (
              <p
                key={item}
                style={{
                  marginBottom: "8px",
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#D1D5DB",
                }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Customer Support */}

          <div>
            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "12px",
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              Customer Support
            </h3>

            {[
              "Fast Delivery",
              "Secure Payment",
              "Easy Returns",
              "24/7 Support",
            ].map((item) => (
              <p
                key={item}
                style={{
                  marginBottom: "8px",
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#D1D5DB",
                }}
              >
                {item}
              </p>
            ))}
          </div>

          {/* Contact */}

          <div>
            <h3
              style={{
                color: "#D4AF37",
                marginBottom: "12px",
                fontSize: isMobile ? "18px" : "22px",
              }}
            >
              Contact
            </h3>

            <p
              style={{
                marginBottom: "8px",
                fontSize: isMobile ? "14px" : "16px",
                color: "#D1D5DB",
              }}
            >
              📧 support@shopease.com
            </p>

            <p
              style={{
                marginBottom: "8px",
                fontSize: isMobile ? "14px" : "16px",
                color: "#D1D5DB",
              }}
            >
              📞 +92 300 1234567
            </p>

            <p
              style={{
                marginBottom: "8px",
                fontSize: isMobile ? "14px" : "16px",
                color: "#D1D5DB",
              }}
            >
              📍 Multan, Pakistan
            </p>
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
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            textAlign: "center",
            gap: "12px",
            marginTop: "20px",
            color: "#9CA3AF",
            fontSize: isMobile ? "12px" : "15px",
          }}
        >
          <span>© 2026 ShopEase. All Rights Reserved.</span>

          <span>Developed with ❤️ using React & Firebase</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;