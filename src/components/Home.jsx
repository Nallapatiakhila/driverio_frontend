import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="brand-title">Driverio</h1>
        <p className="tagline">Enterprise Logistics & Cab Coordination Platform</p>

        <div className="home-features">
          <div className="feature-box">
            <span className="feature-icon">🚕</span>
            <h3>Instant Booking</h3>
            <p>HR and dispatchers can coordinate and book trips instantly for corporate personnel.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">🌤</span>
            <h3>Weather Intelligence</h3>
            <p>Integrates Hyderabad weather forecast to anticipate road conditions and delays.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">🔒</span>
            <h3>Secure Verification</h3>
            <p>Drivers verify trips on the spot with secure OTP keys before hitting the road.</p>
          </div>
          <div className="feature-box">
            <span className="feature-icon">🤖</span>
            <h3>AI Dispatcher</h3>
            <p>Ask our floating AI assistant questions about assignments and bookings anytime.</p>
          </div>
        </div>

        <div className="home-buttons">
          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/reg")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
