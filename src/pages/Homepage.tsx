import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: "#0f172a", background: "#f0f7ff", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 2.5rem", background: "#fff", borderBottom: "1px solid #dbeafe" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#2563eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>S</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>School Management System</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          style={{ fontSize: 14, fontWeight: 500, padding: "8px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Log in
        </button>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "5rem 2rem 4rem", textAlign: "center" }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#2563eb", background: "#dbeafe", padding: "4px 12px", borderRadius: 20, marginBottom: "1.5rem" }}>
          Built for Indian schools
        </span>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0f172a", marginBottom: "1.25rem" }}>
          Everything your school needs,<br />in one place
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", marginBottom: "2.5rem", maxWidth: 480, margin: "0 auto 2.5rem" }}>
          Students, timetables, fees, and parent communication — managed from a single simple dashboard.
        </p>
        <button
          onClick={() => navigate("/login")}
          style={{ fontSize: 15, fontWeight: 600, padding: "12px 32px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Go to Dashboard →
        </button>
      </div>

      {/* FEATURE CARDS */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 2rem 5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
        {[
          { icon: "👤", title: "Student Profiles", desc: "Attendance, grades, and contacts all in one screen." },
          { icon: "📅", title: "Timetables", desc: "Auto-schedule classes without conflicts." },
          { icon: "💳", title: "Fee Collection", desc: "Online payments and automated reminders." },
          { icon: "📢", title: "Parent Portal", desc: "Send results and notices directly to parents." },
        ].map((f) => (
          <div key={f.title} style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 12, padding: "1.5rem 1.25rem" }}>
            <div style={{ fontSize: 28, marginBottom: "0.75rem" }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: "0.4rem" }}>{f.title}</div>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM CTA STRIP */}
      <div style={{ background: "#2563eb", padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: "0.6rem" }}>Ready to simplify your school?</h2>
        <p style={{ fontSize: 14, color: "#bfdbfe", marginBottom: "1.5rem" }}>Takes less than 5 minutes to get started.</p>
        <button
          onClick={() => navigate("/login")}
          style={{ fontSize: 14, fontWeight: 600, padding: "10px 24px", background: "#fff", color: "#2563eb", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          Get Started
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#fff", borderTop: "1px solid #dbeafe", padding: "1.25rem 2rem", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>© 2025 SchoolMS. All rights reserved.</span>
      </footer>

    </div>
  );
}