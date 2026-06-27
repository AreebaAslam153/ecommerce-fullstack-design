import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/Analytics.css";

function Analytics() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const productSnap = await get(ref(database, "products"));
    const orderSnap = await get(ref(database, "orders"));
    const customerSnap = await get(ref(database, "users"));

    if (productSnap.exists())
      setProducts(Object.values(productSnap.val()));

    if (orderSnap.exists())
      setOrders(Object.values(orderSnap.val()));

    if (customerSnap.exists())
      setCustomers(Object.values(customerSnap.val()));
  };

  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const expensiveProduct =
    products.length > 0
      ? [...products].sort((a, b) => b.price - a.price)[0]
      : null;

  return (
    <div className="analytics-page">
      <AdminSidebar />

      <div className="analytics-content">

        <h1>📈 Store Analytics</h1>

        <div className="analytics-grid">

          <div className="analytics-card">
            <h2>{products.length}</h2>
            <p>Total Products</p>
          </div>

          <div className="analytics-card">
            <h2>{orders.length}</h2>
            <p>Total Orders</p>
          </div>

          <div className="analytics-card">
            <h2>{customers.length}</h2>
            <p>Total Customers</p>
          </div>

          <div className="analytics-card">
            <h2>${revenue}</h2>
            <p>Total Revenue</p>
          </div>

        </div>

        <div className="analytics-section">

          <div className="analytics-box">

            <h2>💎 Most Expensive Product</h2>

            {expensiveProduct ? (
              <>
                <img
                  src={expensiveProduct.image}
                  alt={expensiveProduct.name}
                />

                <h3>{expensiveProduct.name}</h3>

                <p>${expensiveProduct.price}</p>
              </>
            ) : (
              <p>No Products Available</p>
            )}

          </div>

          <div className="analytics-box">

            <h2>🕒 Latest Orders</h2>

            {orders.length === 0 ? (
              <p>No Orders</p>
            ) : (
              orders
                .slice(-5)
                .reverse()
                .map((order, index) => (
                  <div
                    key={index}
                    className="recent-order"
                  >
                    <strong>{order.customerName}</strong>

                    <span>${order.total}</span>

                    <small>{order.status}</small>
                  </div>
                ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Analytics;