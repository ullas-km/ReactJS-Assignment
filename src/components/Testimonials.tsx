import "../assets/css/testimonials.css";

const testimonials = [
  {
    name: "Arjun R",
    role: "Principal",
    text: "The system simplified attendance tracking and student management for our entire school.",
  },
  {
    name: "Meera S",
    role: "Administrator",
    text: "Everything is organized in one place and saves our staff hours of manual work every week.",
  },
  {
    name: "Rahul K",
    role: "School Director",
    text: "Fee collection and communication with parents have become much more efficient.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">TESTIMONIALS</span>

          <h2>Trusted By Schools</h2>

          <p>
            Schools across India use our platform to simplify administration,
            improve communication, and save time.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className={`testimonial-card ${
                index === 1 ? "featured" : ""
              }`}
            >
              <div className="quote">❝</div>

              <p>{item.text}</p>

              <div className="user">
                <div className="avatar">
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}