import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./AdminSidebar.css";

function AdminSidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}

      <div className="mobile-header">

        <h2>🛍 ShopEase</h2>

        <button
          className="menu-btn"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>

      </div>

      {/* Overlay */}

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div className={`sidebar ${open ? "show" : ""}`}>

        <button
          className="close-btn"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        <h2>🛍 ShopEase</h2>

        <Link
          to="/admin"
          onClick={() => setOpen(false)}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/orders"
          onClick={() => setOpen(false)}
        >
          📦 Orders
        </Link>

        <Link
          to="/customers"
          onClick={() => setOpen(false)}
        >
          👥 Customers
        </Link>

        <Link
          to="/analytics"
          onClick={() => setOpen(false)}
        >
          📈 Analytics
        </Link>

        <Link
          to="/"
          onClick={() => setOpen(false)}
        >
          🏠 User Website
        </Link>

      </div>
    </>
  );
}

export default AdminSidebar;