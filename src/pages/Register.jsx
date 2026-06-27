import { useState } from "react";
import { registerUser } from "../services/authService";
import Layout from "../components/Layout";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
                resize: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Register
            </button>

          </form>

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;