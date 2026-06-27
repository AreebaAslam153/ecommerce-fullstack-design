import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-header">

      <h1>Dashboard</h1>

      <p>
        Welcome back, Admin 👋
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <h2>Products</h2>

          <h1>0</h1>

        </div>

        <div className="dashboard-card">

          <h2>Orders</h2>

          <h1>0</h1>

        </div>

        <div className="dashboard-card">

          <h2>Customers</h2>

          <h1>0</h1>

        </div>

        <div className="dashboard-card">

          <h2>Revenue</h2>

          <h1>$0</h1>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
