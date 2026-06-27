
import "./DashboardCards.css";

function DashboardCards({
  totalProducts,
  totalOrders,
  totalCustomers,
  totalRevenue,
}) {
  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: "📦",
      color: "#ff6b00",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: "🛒",
      color: "#2196f3",
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: "👥",
      color: "#4caf50",
    },
    {
      title: "Revenue",
      value: `$${totalRevenue}`,
      icon: "💰",
      color: "#9c27b0",
    },
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card) => (
        <div className="dashboard-card" key={card.title}>
          <div className="card-top">
            <div
              className="card-icon"
              style={{ background: card.color }}
            >
              {card.icon}
            </div>

            <div className="card-info">
              <h4>{card.title}</h4>
              <h2>{card.value}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
