import "../assets/css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
  <div className="footer-container">

    <div className="footer-brand">
      <h3>School Management System</h3>
      <p>
        A school management system for managing students,
        teachers, attendance, classes, and communication.
      </p>
    </div>

    <div className="footer-column">
      <h4>Quick Links</h4>

      <a href="#features">Features</a>
      <a href="#testimonials">Testimonials</a>
      <a href="/login">Login</a>
    </div>

  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} School Management System. All rights reserved.
  </div>
</footer>
  );
}