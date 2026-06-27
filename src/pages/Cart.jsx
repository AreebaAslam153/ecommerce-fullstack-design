import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart();

  const navigate = useNavigate();

  return (
    <Layout>

      <section className="cart-header">

        <h1>Shopping Cart</h1>

        <p>Review your items before checkout</p>

      </section>

      <div className="cart-container">

        <div>

          {cartItems.length === 0 ? (

            <div className="empty-cart">

              <h2>Your Cart is Empty 🛒</h2>

              <p>
                Start shopping to add amazing products.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="continue-btn"
              >
                Continue Shopping
              </button>

            </div>

          ) : (

            cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-item-info">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>

                    <h2>{item.name}</h2>

                    <h3>${item.price}</h3>

                    <p>
                      Quantity : {item.quantity}
                    </p>

                  </div>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            ))

          )}

        </div>

        {cartItems.length > 0 && (

          <div className="summary-card">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>Items</span>

              <strong>
                {cartItems.length}
              </strong>

            </div>

            <div className="summary-row">

              <span>Shipping</span>

              <strong className="free">
                Free
              </strong>

            </div>

            <hr />

            <div className="summary-total">

              <strong>Total</strong>

              <strong className="total-price">
                ${totalPrice}
              </strong>

            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/checkout")
              }
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