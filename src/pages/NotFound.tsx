import { Link } from "react-router-dom";
import "../assets/css/notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you are looking for does not exist.</p>

      <Link to="/" className="back-btn">
        Go Back
      </Link>
    </div>
  );
}
