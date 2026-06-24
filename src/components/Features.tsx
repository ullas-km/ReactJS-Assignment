import "../assets/css/features.css";

const features = [
  {
    icon: "👨‍🎓",
    title: "Student Management",
    desc: "Manage student profiles, attendance records, academic history, and contact information from one place.",
  },
  {
    icon: "📅",
    title: "Timetable Scheduling",
    desc: "Create and organize class schedules efficiently while avoiding conflicts.",
  },
  {
    icon: "💳",
    title: "Fee Management",
    desc: "Track payments, pending balances, and maintain complete fee records.",
  },
  {
    icon: "📢",
    title: "Parent Communication",
    desc: "Share announcements, attendance alerts, and important updates instantly.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    desc: "Generate attendance, academic, and performance reports in seconds.",
  },
  {
    icon: "👨‍🏫",
    title: "Teacher Management",
    desc: "Maintain teacher information, assigned subjects, and class responsibilities.",
  },
];

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <span className="section-tag">FEATURES</span>

          <h2>Everything You Need To Manage A School</h2>

          <p>
            A complete platform designed for administrators, teachers,
            students, and parents.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}