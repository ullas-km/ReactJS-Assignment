import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import "../assets/css/login.css";

export default function LoginPage() {
  const navigate = useNavigate();

  // ✅ single state (professional approach)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!value) return "Email is required";
      if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
    }

    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Minimum 6 characters required";
    }

    return "";
  };

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // update form state
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // live validation
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  // ---------------- SUBMIT ----------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const emailErr = validateField("email", form.email);
    const passErr = validateField("password", form.password);

    if (emailErr || passErr) {
      setErrors({
        email: emailErr,
        password: passErr,
      });
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/welcome");
    } catch {
      setServerError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          {serverError && <p className="error">{serverError}</p>}

          {/* EMAIL */}
          <div className="loginfields">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="field-error">{errors.email}</p>}

          {/* PASSWORD */}
          <div className="loginfields">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="field-error">{errors.password}</p>}

          {/* SIGNUP LINK */}
          <div className="noaccount">
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Create account</Link>
            </p>
          </div>

          {/* BUTTON */}
          <button type="submit" className="loginbtn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}