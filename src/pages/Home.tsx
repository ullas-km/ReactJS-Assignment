import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

export default function DashboardHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Students",
      path: "/welcome/students",
    },
    {
      title: "Fees",
      path: "/welcome/fees",
    },
    {
      title: "Classes",
      path: "/welcome/classes",
    },
    {
      title: "Sections",
      path: "/welcome/sections",
    },
    {
      title: "Teachers",
      path: "/welcome/teachers",
    },
    {
      title: "Subjects",
      path: "/welcome/subjects",
    },
  ];

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="card-grid">
        {cards.map((c) => (
          <div
            key={c.title}
            className="dashboard-card"
            onClick={() => navigate(c.path)}
          >
            <h3>{c.title}</h3>
            <p>Manage {c.title.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}