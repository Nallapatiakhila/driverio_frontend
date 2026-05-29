import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
    cabType: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear cabType if role is changed from driver
    if (name === "role" && value !== "driver") {
      setFormData((prev) => ({
        ...prev,
        role: value,
        cabType: ""
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Strict Email validation
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address (e.g. name@company.com).");
      return;
    }

    // Blacklisted temporary domains
    const blockedDomains = [
      "yopmail.com", "mailinator.com", "tempmail.com", "dispostable.com", 
      "10minutemail.com", "guerrillamail.com", "sharklasers.com", 
      "getairmail.com", "burnermail.io", "trashmail.com", "fakeinbox.com",
      "temp-mail.org", "maildrop.cc", "throwawaymail.com", "tempmailaddress.com"
    ];
    const emailDomain = formData.email.substring(formData.email.indexOf("@") + 1).toLowerCase();
    if (blockedDomains.includes(emailDomain)) {
      alert("Registration rejected: Disposable or temporary email addresses are not allowed. Please use a legitimate email account.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", formData);
      alert(res.data || "Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Driverio corporate logistics network</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              id="username"
              type="text"
              name="username"
              className="auth-input"
              placeholder="John Doe"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="john@company.com"
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

          <div className="form-group">
            <label htmlFor="role">Account Role</label>
            <select
              id="role"
              name="role"
              className="auth-select"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="admin">Admin</option>
              <option value="it">IT Staff</option>
              <option value="hr">HR Specialist</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {formData.role === "driver" && (
            <div className="form-group animate-slide-down">
              <label htmlFor="cabType">Cab Classification</label>
              <select
                id="cabType"
                name="cabType"
                className="auth-select"
                value={formData.cabType}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select Cab Type</option>
                <option value="Cab">Standard Cab (Sedan)</option>
                <option value="Van">Transport Van (Suv/MPV)</option>
              </select>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already registered?{" "}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
