import { useNavigate } from "react-router-dom";
import "../assets/css/hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">School Management Platform</span>

        <h1>
          Manage Your School
          <br />
          With Confidence
        </h1>

        <p>
          Simplify student records, attendance tracking, fee management,
          timetables, and communication through one centralized platform.
        </p>

        <div className="hero-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <a href="#features" className="secondary-btn">
            Learn More
          </a>
        </div>
      </div>

      <div className="hero-image">
        <div className="hero-dashboard">
          <div className="card-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="card-body">
            <div className="stat">
              <h3>1,300</h3>
              <p>Students</p>
            </div>

            <div className="stat">
              <h3>25</h3>
              <p>Teachers</p>
            </div>

            <div className="stat">
              <h3>96%</h3>
              <p>Attendance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}