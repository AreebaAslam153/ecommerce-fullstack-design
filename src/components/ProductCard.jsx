import "../styles/ProductCard.css";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ image, name, price, id }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">

      <div className="product-badge">
        New
      </div>

      <Link
        to={`/products/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div className="product-image">
          <img src={image} alt={name} />
        </div>

        <div className="product-content">

          <h3>{name}</h3>

          <div className="rating">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="price">
            ${price}
          </p>

        </div>
      </Link>

      <button
        className="cart-btn"
        onClick={() =>
          addToCart({
            id,
            image,
            name,
            price,
          })
        }
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;