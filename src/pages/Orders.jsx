import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getOrders,
  updateOrderStatus,
} from "../services/productService";

import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data.reverse());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    loadOrders();
  };

  return (
    <Layout>

      {/* Hero */}

      <section className="orders-hero">
        <h1>Orders Management</h1>
        <p>Manage and track all customer orders.</p>
      </section>

      <div className="orders-container">

        {orders.length === 0 ? (
          <div className="no-orders">
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (

            <div className="order-card" key={order.id}>

              <div className="order-header">

                <div>

                  <h2>{order.customerName}</h2>

                  <p>📧 {order.email}</p>

                  <p>📞 {order.phone}</p>

                  <p>📍 {order.address}</p>

                </div>

                <div>

                  <div className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>

                  <p className="order-date">
                    {order.orderDate}
                  </p>

                </div>

              </div>

              <div className="products-title">
                Ordered Products
              </div>

              {order.items.map((item) => (

                <div className="order-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="item-info">

                    <h4>{item.name}</h4>

                    <p>Quantity : {item.quantity}</p>

                  </div>

                  <strong>
                    ${item.price * item.quantity}
                  </strong>

                </div>

              ))}

              <div className="order-footer">

                <h2>
                  Total : ${order.total}
                </h2>

                <div className="buttons">

                  <button
                    className="processing"
                    onClick={() =>
                      changeStatus(order.id, "Processing")
                    }
                  >
                    Processing
                  </button>

                  <button
                    className="delivered"
                    onClick={() =>
                      changeStatus(order.id, "Delivered")
                    }
                  >
                    Delivered
                  </button>

                  <button
                    className="cancelled"
                    onClick={() =>
                      changeStatus(order.id, "Cancelled")
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>

          ))
        )}

      </div>

    </Layout>
  );
}

export default Orders;