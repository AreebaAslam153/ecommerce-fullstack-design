import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { auth, database } from "../firebase/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const { cartItems } = useCart();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const snapshot = await get(ref(database, `users/${currentUser.uid}`));

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">ShopEase</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        {userData?.role !== "admin" && (
          <>
            <Link to="/products" onClick={closeMenu}>
              Products
            </Link>

            <Link to="/cart" onClick={closeMenu}>
              Cart
              <span className="cart-badge">
                {cartItems.length}
              </span>
            </Link>
          </>
        )}

        {userData?.role === "admin" && (
          <Link to="/admin" onClick={closeMenu}>
            Dashboard
          </Link>
        )}

        {user ? (
          <>
            <span className="user-name">
              👋 {userData?.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMenu}>
              Login
            </Link>

            <Link to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        )}
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;