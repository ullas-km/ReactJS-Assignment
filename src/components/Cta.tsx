import { useNavigate } from "react-router-dom";
import "../assets/css/cta.css";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <span className="cta-tag">GET STARTED</span>

        <h2>
          Ready to Transform
          <br />
          Your School Management?
        </h2>

        <p>
          Join schools that use SchoolMS to manage attendance,
          students, teachers, fees, and communication efficiently
          from a single platform.
        </p>

        <div className="cta-actions">
          <button
            className="cta-primary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <a href="#features" className="cta-secondary-btn">
            Explore Features
          </a>
        </div>
      </div>
    </section>
  );
}