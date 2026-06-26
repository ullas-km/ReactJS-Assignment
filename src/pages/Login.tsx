import { useState, type ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import "../assets/css/login.css";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/auth/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const validateField = (name: string, value: string) => {
    if (name === "email") {
      if (!value) return "Email is required";

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

      if (!emailRegex.test(value)) {
        return "Invalid email format";
      }
    }

    if (name === "password") {
      if (!value) return "Password is required";

      if (value.length < 6) {
        return "Minimum 6 characters required";
      }
    }

    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleLogin = async (e: React.BaseSyntheticEvent): Promise<void> => {
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

      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user,
        }),
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home");
    } catch {
      setServerError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2 className="login-title">Login</h2>

          {serverError && <p className="login-error">{serverError}</p>}

          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {errors.email && <p className="field-error">{errors.email}</p>}

          <div className="login-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {errors.password && <p className="field-error">{errors.password}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="back-home">
            <Link to="/" className="home-link">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
