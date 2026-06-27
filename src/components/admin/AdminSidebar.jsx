import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="sidebar">

      <h2>🛍 ShopEase</h2>

      <Link to="/admin">
        📊 Dashboard
      </Link>

      <Link to="/orders">
        📦 Orders
      </Link>

      <Link to="/customers">
        👥 Customers
      </Link>

      <Link to="/analytics">
        📈 Analytics
      </Link>

      <Link to="/">
        🏠 User Website
      </Link>

    </div>
  );
}

export default AdminSidebar;
