import {
  useState
} from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authApi";

import "../assets/css/login.css"

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  
  const handleLogin = async (
  e: React.SyntheticEvent<HTMLFormElement>
) => {
    e.preventDefault();

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      navigate("/welcome");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="main">
    <div
      className="container"
    >
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p>{error}</p>}

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="noaccount">
          <p>
  Don't have an account?{" "}
  
  <Link to="/signup">
    Create account
  </Link>
</p>
        </div>

        <button type="submit" className="loginbtn">Login</button>
      </form>
    </div>
          
    </div>
  );
}
