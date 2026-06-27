import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import "../styles/ProductDetails.css";

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
        <div className="loading-product">
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

      <div className="details-container">

        <div className="details-grid">

          <div className="product-image-box">

            <img
              src={product.image}
              alt={product.name}
              className="details-image"
            />

          </div>

          <div>

            <span className="best-seller">
              ⭐ Best Seller
            </span>

            <h1 className="details-title">
              {product.name}
            </h1>

            <div className="rating-row">
              ⭐⭐⭐⭐⭐
              <span>(4.9 Reviews)</span>
            </div>

            <h2 className="details-price">
              ${product.price}
            </h2>

            <p className="details-description">
              Experience premium quality electronics designed for
              performance, durability, and everyday convenience.
              Enjoy fast delivery, warranty support, and trusted
              quality.
            </p>

            <div className="quantity-section">

              <h3>Quantity</h3>

              <div className="quantity-box">

                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(quantity - 1)
                  }
                >
                  -
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>

            <div className="details-buttons">

              <button
                className="cart-button"
                onClick={handleAddToCart}
              >
                🛒 Add to Cart
              </button>

              <button
                className="buy-button"
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
              >
                Buy Now
              </button>

            </div>

            <div className="delivery-box">

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