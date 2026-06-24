import { useNavigate } from "react-router-dom";
import "../assets/css/homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="app">

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <div className="logo-mark">S</div>
          School Management System
        </a>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>

        <button className="nav-login" onClick={() => navigate("/login")}>
          Log in
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-bg"></div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Built for Indian schools
          </div>

          <h1 className="hero-h1">
            Everything your school needs,<br />
            in <em>one place</em>
          </h1>

          <p className="hero-p">
            Students, timetables, fees, and parent communication —
            managed from a single simple dashboard.
          </p>

          <div className="hero-actions">
            <button className="btn-main" onClick={() => navigate("/login")}>
              Go to Dashboard →
            </button>
          </div>

          <div className="hero-note">
            ✔ Secure, fast & scalable system
          </div>
        </div>

        {/* MOCK DASHBOARD */}
        <div className="hero-visual">
          <div className="mock-window">

            <div className="mock-bar">
              <div className="mock-dot" />
              <div className="mock-bar-label">Dashboard Preview</div>
            </div>

            <div className="mock-body">

              <div className="mock-stats-row">
                <div className="mock-stat">
                  <div className="mock-stat-val">1,240</div>
                  <div className="mock-stat-lbl">Students</div>
                </div>

                <div className="mock-stat">
                  <div className="mock-stat-val">48</div>
                  <div className="mock-stat-lbl">Teachers</div>
                </div>

                <div className="mock-stat">
                  <div className="mock-stat-val">96%</div>
                  <div className="mock-stat-lbl">Attendance</div>
                </div>
              </div>

              <div>
                <div className="mock-section-label">Attendance</div>

                <div className="mock-att-row">
                  <span className="mock-att-lbl">Class 10A</span>
                  <span className="mock-att-pct">92%</span>
                </div>
                <div className="mock-track">
                  <div className="mock-fill" style={{ width: "92%" }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* STATS BAND */}
      <section className="stats-band">
        <div className="stat-item">
          <div className="stat-val">500+</div>
          <div className="stat-lbl">Schools</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">50k+</div>
          <div className="stat-lbl">Students</div>
        </div>

        <div className="stat-item">
          <div className="stat-val">99%</div>
          <div className="stat-lbl">Uptime</div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features-section">
        <span className="section-tag">Features</span>
        <h2 className="section-h2">Everything you need to manage a school</h2>
        <p className="section-p">
          A complete system for students, teachers, parents, and administrators.
        </p>

        <div className="features-grid">

          {[
            { icon: "👤", title: "Student Profiles", desc: "Attendance, grades, and contacts all in one screen." },
            { icon: "📅", title: "Timetables", desc: "Auto-schedule classes without conflicts." },
            { icon: "💳", title: "Fee Collection", desc: "Online payments and automated reminders." },
            { icon: "📢", title: "Parent Portal", desc: "Send results and notices directly to parents." },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <div className="feat-desc">{f.desc}</div>
            </div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials-section">
        <span className="section-tag">Testimonials</span>
        <h2 className="section-h2">Loved by schools</h2>

        <div className="testi-grid">

          <div className="testi-card">
            <div className="testi-quote-mark">“</div>
            <div className="testi-quote">
              This system simplified everything from attendance to communication.
            </div>
            <div className="testi-person">
              <div className="testi-avatar">AR</div>
              <div>
                <div className="testi-name">Arjun R</div>
                <div className="testi-role">Principal</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-h2">Ready to simplify your school?</h2>
        <p className="cta-p">Takes less than 5 minutes to get started.</p>

        <button className="btn-white" onClick={() => navigate("/login")}>
          Get Started →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">SchoolMS</div>

        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>

    </div>
  );
}