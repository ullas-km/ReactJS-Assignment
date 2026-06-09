import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../assets/css/dashboard.css";
import { useAppSelector } from "../app/hooks";

type User = {
  name: string;
  role: string;
};

export default function WelcomePage() {
  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return null;

  return (
    <div className="dashboard">
      <Sidebar role={user.role} />

      <div className="dashboard-content">
        <Header name={user.name} />

        <div className="dashboard-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
