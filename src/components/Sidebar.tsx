import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

import "../assets/css/sidebar.css";

type SidebarProps = Readonly<{
  role: string;
}>;

export default function Sidebar({ role }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const closeSidebar = () => setMobileOpen(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [attendanceOpen, setAttendanceOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "menu-link active" : "menu-link";

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
        <h2>School App</h2>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="logo">School App</div>

        <div className="menu">
          {/* HOME */}
          <NavLink to="/home" className={getLinkClass} onClick={closeSidebar}>
            Home
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink
                to="/students"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Students
              </NavLink>

              <NavLink
                to="/fees"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Fees
              </NavLink>

              <NavLink
                to="/classes"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Classes
              </NavLink>

              <NavLink
                to="/sections"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Sections
              </NavLink>

              <NavLink
                to="/teachers"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Teachers
              </NavLink>

              <NavLink
                to="/subjects"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Subjects
              </NavLink>
              <NavLink
                to="/teacher-timetable"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Add Timetable
              </NavLink>
            </>
          )}
          {role === "student" && (
            <>
              <NavLink
                to="/payments"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Payments
              </NavLink>

              <NavLink
                to="/marks"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Marks
              </NavLink>

              <NavLink
                to="/timetable"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Timetable
              </NavLink>
            </>
          )}
          {role === "teacher" && (
            <>
              <NavLink
                to="/teacher-students"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Students
              </NavLink>
              <div className="menu-dropdown">
                <button
                  type="button"
                  className={`menu-link dropdown-btn attendance ${
                    attendanceOpen ? "active" : ""
                  }`}
                  onClick={() => setAttendanceOpen((prev) => !prev)}
                >
                  Attendance {attendanceOpen ? "▲" : "▼"}
                </button>

                {attendanceOpen && (
                  <div className="submenu">
                    <NavLink
                      to="/teacher-attendance"
                      className={getLinkClass}
                      onClick={closeSidebar}
                    >
                      Add Attendance
                    </NavLink>

                    <NavLink
                      to="/teacher-view-attendance"
                      className={getLinkClass}
                      onClick={closeSidebar}
                    >
                      View Attendance
                    </NavLink>
                  </div>
                )}
              </div>
              {/* <NavLink
                to="/teacher-timetable"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Add Timetable
              </NavLink> */}
              <NavLink
                to="/teacher-my-timetable"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                My Timetable
              </NavLink>

              <NavLink
                to="/teacher-marks"
                className={getLinkClass}
                onClick={closeSidebar}
              >
                Add Marks
              </NavLink>
            </>
          )}
        </div>
        {/* PROFILE SECTION */}
        <NavLink
          to="/profile"
          className="profile-section"
          onClick={closeSidebar}
        >
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <span className="profile-name">{user?.name}</span>
            <span className="profile-role">{user?.role}</span>
          </div>
        </NavLink>
        {/* LOGOUT */}
        <div className="logout-section">
          <button
            onClick={() => {
              dispatch(logout());

              localStorage.removeItem("token");
              localStorage.removeItem("user");

              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
