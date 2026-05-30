import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://driverio-backend-1.onrender.com/api/auth/login",
        formData
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      localStorage.setItem("email", decoded.sub);

      const role = decoded.role;

      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "hr") navigate("/hr-dashboard");
      else if (role === "it") navigate("/it-dashboard");
      else if (role === "driver") navigate("/driver-dashboard");
      else navigate("/");

    } catch (err) {
      alert(err.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Access your Driverio logistics control panel</p>

        <form onSubmit={handleLoginSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Corporate Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="auth-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/reg" className="auth-link">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
