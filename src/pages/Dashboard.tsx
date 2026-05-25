import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../assets/css/dashboard.css";

export default function WelcomePage() {

 const user = JSON.parse(localStorage.getItem("user") || "null");

if (!user) return null;

  return (

    <div className="dashboard">

      <Sidebar role={user.role} />

      <div className="dashboard-content">

        <Header
          name={user.name}
          role={user.role}
        />

        <div className="dashboard-main">

          <Outlet />

        </div>

      </div>

    </div>
  );
}