import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Admin from "../pages/Admin";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import ProtectedRoute from "../components/ProtectedRoute";
import Orders from "../pages/Orders";
import Customers from "../pages/Customers";
import Analytics from "../pages/Analytics";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute adminOnly={true}>
      <Orders />
    </ProtectedRoute>
  }
/>
<Route
  path="/customers"
  element={
    <ProtectedRoute adminOnly={true}>
      <Customers />
    </ProtectedRoute>
  }
/>
<Route
  path="/analytics"
  element={
    <ProtectedRoute adminOnly={true}>
      <Analytics />
    </ProtectedRoute>
  }
/>
  <Route path="/products/:id" element={<ProductDetails />} />
  <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default AppRoutes;