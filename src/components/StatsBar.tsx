import "../assets/css/stats.css";

const stats = [
  {
    value: "50+",
    label: "Schools",
  },
  {
    value: "2k+",
    label: "Students",
  },
  {
    value: "99%",
    label: "System Uptime",
  },
  {
    value: "24/7",
    label: "Support",
  },
];

export default function StatsBar() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}