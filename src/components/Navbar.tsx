import { useNavigate } from "react-router-dom";
import "../assets/css/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <div className="logo-icon">S</div>
          <span>School Management System</span>
        </div>

        <nav className="navbar-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
        </nav>

        <button
  className="navbar-login-btn"
  onClick={() => navigate("/login")}
>
  Login
</button>

      </div>
    </header>
  );
}