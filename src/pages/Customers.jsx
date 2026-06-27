import { useEffect, useState } from "react";
import { database } from "../firebase/firebase";
import { ref, get } from "firebase/database";
import AdminSidebar from "../components/admin/AdminSidebar";
import "../styles/Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    const snapshot = await get(ref(database, "users"));

    if (snapshot.exists()) {
      const data = Object.entries(snapshot.val()).map(([id, value]) => ({
        id,
        ...value,
      }));

      setCustomers(data);
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(search.toLowerCase()) ||
      customer.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="customers-page">
      <AdminSidebar />

      <div className="customers-content">
        <h1>👥 Customers</h1>

        <p>Manage all registered users.</p>

        <div className="customer-top">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="customer-count">
            Total Customers: {filteredCustomers.length}
          </div>
        </div>

        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <span
                    className={
                      customer.role === "admin"
                        ? "admin-role"
                        : "customer-role"
                    }
                  >
                    {customer.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;