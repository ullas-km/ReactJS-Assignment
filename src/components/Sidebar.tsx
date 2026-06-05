import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/sidebar.css";

type SidebarProps = Readonly<{
  role: string;
}>;

export default function Sidebar({ role }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigate = useNavigate();

  const closeSidebar = () => setMobileOpen(false);

  const toggleMenu = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <>
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>

        <h2>School App</h2>
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <h2 className="logo">
          <Link to="/home" onClick={closeSidebar} className="logo-link">
            School App
          </Link>
        </h2>

        <ul className="menu">
          {/* HOME */}
          <li>
            <Link to="/home" onClick={closeSidebar}>
              Home
            </Link>
          </li>

          {/* STUDENTS */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("students");
                  navigate("students");
                  closeSidebar();
                }}
              >
                <span>Students</span>
                <span>{openMenu === "students" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "students" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="students/view" onClick={closeSidebar}>
                      View Students
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* FEES */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("fees");
                  navigate("/fees");
                  closeSidebar();
                }}
              >
                <span>Fees</span>
                <span>{openMenu === "fees" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "fees" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/fees/view" onClick={closeSidebar}>
                      View Fees
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* CLASSES */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("classes");
                  navigate("/classes");
                  closeSidebar();
                }}
              >
                <span>Classes</span>
                <span>{openMenu === "classes" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "classes" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/classes/view" onClick={closeSidebar}>
                      View Classes
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* SECTIONS */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("sections");
                  navigate("/sections");
                  closeSidebar();
                }}
              >
                <span>Sections</span>
                <span>{openMenu === "sections" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "sections" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/sections/view" onClick={closeSidebar}>
                      View Sections
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* TEACHERS */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("teachers");
                  navigate("/teachers");
                  closeSidebar();
                }}
              >
                <span>Teachers</span>
                <span>{openMenu === "teachers" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "teachers" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/teachers/view" onClick={closeSidebar}>
                      View Teachers
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* SUBJECTS */}
          {role === "admin" && (
            <li>
              <button
                className="menu-btn"
                onClick={() => {
                  toggleMenu("subjects");
                  navigate("/subjects");
                  closeSidebar();
                }}
              >
                <span>Subjects</span>
                <span>{openMenu === "subjects" ? "▲" : "▼"}</span>
              </button>

              {openMenu === "subjects" && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/subjects/view" onClick={closeSidebar}>
                      View Subjects
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        {/* LOGOUT */}
        <div className="logout-section">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              globalThis.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
