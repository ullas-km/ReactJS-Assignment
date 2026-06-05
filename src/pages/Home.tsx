import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

export default function DashboardHome() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  const isAdmin = user.role === "admin";

  const cards = [
    isAdmin && { title: "Students", path: "/students" },
    isAdmin && { title: "Fees", path: "/fees" },
    isAdmin && { title: "Classes", path: "/classes" },
    isAdmin && { title: "Sections", path: "/sections" },
    isAdmin && { title: "Teachers", path: "/teachers" },
    isAdmin && { title: "Subjects", path: "/subjects" },
  ].filter(Boolean) as { title: string; path: string }[];

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="card-grid">
        {cards.map((c) => (
          <button
            key={c.title}
            className="dashboard-card"
            onClick={() => navigate(c.path)}
          >
            <h3>{c.title}</h3>
            <p>Manage {c.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
