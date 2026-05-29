import React from "react";
import { useNavigate } from "react-router-dom";
import Clock from "./common/Clock";
import WeatherWidget from "./common/WeatherWidget";
import "./Dashboard.css";

const DriverDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div>
          <h2>Driverio</h2>
          <button onClick={() => navigate("/driver-trips")}>
            🚘 My Assigned Trips
          </button>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <Clock />
          <WeatherWidget />
        </div>

        <div className="dashboard-card">
          <h2>Driver Dashboard</h2>
          <p>View your assigned trips.</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
