import { useNavigate } from "react-router-dom";
import "../assets/css/home.css";

export default function DashboardHome() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  const isAdmin = user.role === "admin";
  const isStudent = user.role === "student";
  const isTeacher = user.role === "teacher";

  const cards = [
    // ADMIN
    isAdmin && { title: "Students", path: "/students" },
    isAdmin && { title: "Teachers", path: "/teachers" },
    isAdmin && { title: "Classes", path: "/classes" },
    isAdmin && { title: "Sections", path: "/sections" },
    isAdmin && { title: "Subjects", path: "/subjects" },
    isAdmin && { title: "Fees", path: "/fees" },

    // STUDENT
    isStudent && { title: "My Marks", path: "/marks" },
    isStudent && { title: "My Fees", path: "/payments" },

    // TEACHER
    isTeacher && { title: "Add Marks", path: "/teacher-marks" },
    isTeacher && { title: "Attendance", path: "/teacher-attendance" },
    isTeacher && { title: "Students", path: "/teacher-students" },
  ].filter(Boolean) as { title: string; path: string }[];

  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">
        {isAdmin && "Admin Dashboard"}
        {isStudent && "Student Dashboard"}
        {isTeacher && "Teacher Dashboard"}
      </h2>

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