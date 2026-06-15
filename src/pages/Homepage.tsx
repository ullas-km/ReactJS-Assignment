// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "../assets/css/homepage.css"

// const FEATURES = [
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
//         <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
//       </svg>
//     ),
//     title: "Student Profiles",
//     desc: "Complete academic history, attendance, and parent contacts in one place.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
//         <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
//       </svg>
//     ),
//     title: "Timetable Engine",
//     desc: "Auto-generate conflict-free schedules for classes, teachers, and rooms.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
//       </svg>
//     ),
//     title: "Grade Analytics",
//     desc: "Live performance trends with early-intervention alerts for struggling students.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//       </svg>
//     ),
//     title: "Parent Portal",
//     desc: "Instant push notifications, report cards, and direct teacher messaging.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
//       </svg>
//     ),
//     title: "Fee Collection",
//     desc: "Automated billing, online payments, and one-click financial summaries.",
//   },
//   {
//     icon: (
//       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
//         <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
//       </svg>
//     ),
//     title: "Digital Exams",
//     desc: "Create, schedule, and auto-grade assessments with detailed result breakdowns.",
//   },
// ];

// const STATS = [
//   { value: "12,000+", label: "Students managed" },
//   { value: "340+", label: "Schools onboard" },
//   { value: "98.6%", label: "Uptime guarantee" },
//   { value: "4.9 ★", label: "Admin satisfaction" },
// ];

// const TESTIMONIALS = [
//   {
//     quote: "We cut our monthly admin work by more than half. Timetable generation alone saves our staff an entire day.",
//     name: "Priya Nair",
//     role: "Principal, Bethany Public School",
//     initials: "PN",
//   },
//   {
//     quote: "Parents finally feel connected. The notification system has transformed how we communicate fee reminders and results.",
//     name: "Rajesh Kumar",
//     role: "Admin Head, Greenfield Academy",
//     initials: "RK",
//   },
//   {
//     quote: "Setup was done in a single afternoon. The support team walked us through everything. Highly recommended.",
//     name: "Anita Mathew",
//     role: "IT Coordinator, St. Mary's CBSE",
//     initials: "AM",
//   },
// ];

// function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLSpanElement>(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !started.current) {
//         started.current = true;
//         const duration = 1600;
//         const steps = 50;
//         const increment = target / steps;
//         let current = 0;
//         const timer = setInterval(() => {
//           current += increment;
//           if (current >= target) { setCount(target); clearInterval(timer); }
//           else setCount(Math.floor(current));
//         }, duration / steps);
//       }
//     }, { threshold: 0.5 });
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [target]);

//   return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
// }

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [attPct] = useState(91);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <style>{`
       
//       `}</style>

//       {/* ── NAV ── */}
//       <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
//         <a href="#" className="nav-logo">
//           <div className="logo-mark">S</div>
//           School Management System
//         </a>
//         <ul className="nav-links">
//           {["Features", "Testimonials"].map(l => (
//             <li key={l}><a href={`#${l.toLowerCase().replace(/ /g, "-")}`}>{l}</a></li>
//           ))}
//         </ul>
//         <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
//           <button className="nav-login" onClick={() => navigate("/login")}>Log In →</button>
//           <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
//             <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2}>
//               {menuOpen
//                 ? <><line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/></>
//                 : <><line x1="2" y1="4" x2="16" y2="4"/><line x1="2" y1="9" x2="16" y2="9"/><line x1="2" y1="14" x2="16" y2="14"/></>
//               }
//             </svg>
//           </button>
//         </div>
//       </nav>

//       <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
//         {["Features", "For Schools", "Testimonials"].map(l => (
//           <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} onClick={() => setMenuOpen(false)}>{l}</a>
//         ))}
//         <button className="btn-main" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setMenuOpen(false); navigate("/login"); }}>
//           Log In
//         </button>
//       </div>

//       {/* ── HERO ── */}
//       <section className="hero">
//         <div className="hero-bg" />
//         <div className="hero-content">
//           <div className="hero-badge"><span className="hero-badge-dot"/>School Management Platform</div>
//           <h1 className="hero-h1">
//             One platform for<br/>your <em>entire school</em>
//           </h1>
//           <p className="hero-p">
//             Manage students, staff, timetables, fees, and parent communication — all from a single, beautifully simple dashboard.
//           </p>
//           <div className="hero-actions">
//             <button className="btn-main" onClick={() => navigate("/login")}>
//               Go to Dashboard
//               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
//                 <path d="M3 8h10M9 4l4 4-4 4"/>
//               </svg>
//             </button>
//           </div>
//           <div className="hero-note">
//             <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
//               <path d="M13 4L6.5 11 3 7.5"/>
//             </svg>
//             No setup fee &nbsp;·&nbsp; Free onboarding support &nbsp;·&nbsp; Cancel anytime
//           </div>
//         </div>

//         {/* Dashboard mock */}
//         <div className="hero-visual">
//           <div style={{ position: "relative" }}>
//             <div className="live-chip"><span className="live-dot"/>LIVE</div>
//             <div className="mock-window">
//               <div className="mock-bar">
//                 <div className="mock-dot" style={{ background: "#FF5F56" }}/>
//                 <div className="mock-dot" style={{ background: "#FFBD2E" }}/>
//                 <div className="mock-dot" style={{ background: "#27C93F" }}/>
//                 <span className="mock-bar-label">Admin Dashboard</span>
//               </div>
//               <div className="mock-body">
//                 <div className="mock-stats-row">
//                   {[
//                     { val: "1,248", lbl: "Students", chg: "+12 this week", color: "#2563EB" },
//                     { val: "84", lbl: "Teachers", chg: "+2 this month", color: "#7C3AED" },
//                     { val: "36", lbl: "Classes", chg: "All active", color: "#059669" },
//                   ].map(s => (
//                     <div className="mock-stat" key={s.lbl}>
//                       <div className="mock-stat-val" style={{ color: s.color }}>{s.val}</div>
//                       <div className="mock-stat-lbl">{s.lbl}</div>
//                       <div className="mock-stat-chg up">{s.chg}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div>
//                   <div className="mock-section-label">Today's Attendance</div>
//                   <div className="mock-att-row">
//                     <span className="mock-att-lbl">Present across all classes</span>
//                     <span className="mock-att-pct">{attPct}%</span>
//                   </div>
//                   <div className="mock-track">
//                     <div className="mock-fill" style={{ width: `${attPct}%` }}/>
//                   </div>
//                 </div>

//                 <div>
//                   <div className="mock-section-label">Recent Activity</div>
//                   <div className="mock-activity">
//                     {[
//                       { init: "AM", name: "Arjun Mehta", sub: "Fee paid ₹4,200", time: "2m ago", bg: "#2563EB" },
//                       { init: "ST", name: "Sara Thomas", sub: "Marked present — 9A", time: "4m ago", bg: "#7C3AED" },
//                       { init: "9B", name: "Class 9-B", sub: "Timetable updated", time: "9m ago", bg: "#059669" },
//                     ].map(r => (
//                       <div className="mock-row" key={r.name}>
//                         <div className="mock-avatar" style={{ background: r.bg }}>{r.init}</div>
//                         <div className="mock-row-info">
//                           <div className="mock-row-name">{r.name}</div>
//                           <div className="mock-row-sub">{r.sub}</div>
//                         </div>
//                         <div className="mock-row-time">{r.time}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── STATS ── */}
//       <div className="stats-band">
//         {STATS.map(s => (
//           <div className="stat-item" key={s.label}>
//             <div className="stat-val">{s.value}</div>
//             <div className="stat-lbl">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* ── FEATURES ── */}
//       <section className="features-section" id="features">
//         <div>
//           <div className="section-tag">Features</div>
//           <h2 className="section-h2">Everything your school needs, nothing it doesn't</h2>
//           <p className="section-p">Built for principals, teachers, and administrators — all in one coherent system.</p>
//         </div>
//         <div className="features-grid">
//           {FEATURES.map(f => (
//             <div className="feature-card" key={f.title}>
//               <div className="feat-icon">{f.icon}</div>
//               <div className="feat-title">{f.title}</div>
//               <p className="feat-desc">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── TESTIMONIALS ── */}
//       <section className="testimonials-section" id="testimonials">
//         <div>
//           <div className="section-tag">Testimonials</div>
//           <h2 className="section-h2">Trusted by school leaders across India</h2>
//           <p className="section-p">Here's what administrators say after switching to School Management System.</p>
//         </div>
//         <div className="testi-grid">
//           {TESTIMONIALS.map(t => (
//             <div className="testi-card" key={t.name}>
//               <div className="testi-quote-mark">"</div>
//               <p className="testi-quote">{t.quote}</p>
//               <div className="testi-person">
//                 <div className="testi-avatar">{t.initials}</div>
//                 <div>
//                   <div className="testi-name">{t.name}</div>
//                   <div className="testi-role">{t.role}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="cta-section">
//         <h2 className="cta-h2">Ready to simplify your school?</h2>
//         <p className="cta-p">Log in to your dashboard and experience the difference in the first five minutes.</p>
//         <button className="btn-white" onClick={() => navigate("/login")}>
//           Go to Dashboard
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5}>
//             <path d="M3 8h10M9 4l4 4-4 4"/>
//           </svg>
//         </button>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer className="footer">
//         <div className="footer-logo">School Management System</div>
//         <div>© 2025 School Management System. All rights reserved.</div>
//         <div className="footer-links">
//           <a href="#">Privacy</a>
//           <a href="#">Terms</a>
//           <a href="#">Contact</a>
//         </div>
//       </footer>
//     </>
//   );
// }

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
          <span style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>SchoolMS</span>
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