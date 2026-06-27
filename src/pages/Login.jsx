
import { useState } from "react";
import {
  loginUser,
  getCurrentUserData,
} from "../services/authService";
import Layout from "../components/Layout";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Login user
      await loginUser(email, password);

      // Get user profile from Realtime Database
      const userData = await getCurrentUserData();

      alert("Login Successful!");

      // Redirect based on role
      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Welcome Back 👋</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
