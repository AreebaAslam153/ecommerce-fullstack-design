
import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/productService";

import AdminSidebar from "../components/admin/AdminSidebar";
import DashboardCards from "../components/admin/DashboardCards";
import AddProductForm from "../components/admin/AddProductForm";
import ProductTable from "../components/admin/ProductTable";

import "../styles/Admin.css";

function Admin() {
  // =========================
  // Add Product States
  // =========================

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // =========================
  // Products
  // =========================

  const [products, setProducts] = useState([]);

  const [totalOrders, setTotalOrders] = useState(0);

  const [totalCustomers, setTotalCustomers] = useState(0);

  const [totalRevenue, setTotalRevenue] = useState(0);

  // =========================
  // Edit States
  // =========================

  const [editingId, setEditingId] = useState(null);

  const [editName, setEditName] = useState("");

  const [editPrice, setEditPrice] = useState("");

  const [editImage, setEditImage] = useState("");

  // =========================
  // Load Products
  // =========================

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

 useEffect(() => {
  loadProducts();
  loadDashboard();
}, []);


  const loadDashboard = async () => {
  // Orders
  const orderSnapshot = await get(ref(database, "orders"));

  if (orderSnapshot.exists()) {
    const orders = Object.values(orderSnapshot.val());

    setTotalOrders(orders.length);

    const revenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    setTotalRevenue(revenue);
  } else {
    setTotalOrders(0);
    setTotalRevenue(0);
  }

  // Customers
  const customerSnapshot = await get(ref(database, "users"));

  if (customerSnapshot.exists()) {
    setTotalCustomers(
      Object.keys(customerSnapshot.val()).length
    );
  } else {
    setTotalCustomers(0);
  }
};
  // =========================
  // Add Product
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct({
      name,
      price: Number(price),
      image,
    });

    alert("Product Added Successfully!");

    setName("");
    setPrice("");
    setImage("");

    loadProducts();
  };

  // =========================
  // Delete Product
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    await deleteProduct(id);

    alert("Product Deleted Successfully!");

    loadProducts();
  };

  // =========================
  // Edit Product
  // =========================

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
    setEditImage(product.image);
  };

  // =========================
  // Update Product
  // =========================

  const handleUpdate = async () => {
    await updateProduct(editingId, {
      name: editName,
      price: Number(editPrice),
      image: editImage,
    });

    alert("Product Updated Successfully!");

    setEditingId(null);

    loadProducts();
  };

  return (
    <div className="admin-page">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Content */}

      <div className="admin-content">

        <h1
          style={{
            marginBottom: "8px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Manage your products and monitor your store.
        </p>

        {/* Statistics */}

        <DashboardCards
  totalProducts={products.length}
  totalOrders={totalOrders}
  totalCustomers={totalCustomers}
  totalRevenue={totalRevenue}
/>

        {/* Add Product */}

        <AddProductForm
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmit}
        />

        {/* Product Table */}

        <ProductTable
          products={products}
          editingId={editingId}
          editName={editName}
          setEditName={setEditName}
          editPrice={editPrice}
          setEditPrice={setEditPrice}
          editImage={editImage}
          setEditImage={setEditImage}
          startEditing={startEditing}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          setEditingId={setEditingId}
        />

      </div>
    </div>
  );
}

export default Admin;
