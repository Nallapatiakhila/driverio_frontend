import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "./common/Clock";
import WeatherWidget from "./common/WeatherWidget";
import axios from "axios";
import "./Dashboard.css";

function ItDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0
  });

  useEffect(() => {
    // Fetch bookings to display stats dynamically
    const email = localStorage.getItem("email") || "";
    axios.get(`http://localhost:8080/api/hr/all-bookings?email=${email}`)
      .then(res => {
        const bookings = res.data;
        setStats({
          totalBookings: bookings.length,
          activeBookings: bookings.filter(b => b.status?.toLowerCase() === "pending" || b.status?.toLowerCase() === "assigned").length
        });
      })
      .catch(err => {
        console.error("Error fetching IT dashboard stats:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-menu">
          <h2 className="logo">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span>Driverio</span>
          </h2>

          <button
            className="menu-btn active"
            onClick={() => navigate("/it-dashboard")}
          >
            📊 Dashboard Overview
          </button>

          <button
            className="menu-btn"
            onClick={() => navigate("/hr-book-cab")}
          >
            🚕 Book a Cab
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* TOP BAR */}
        <div className="top-bar">
          <Clock />
          <WeatherWidget />
        </div>

        <div className="dashboard-card">
          <h2>IT Dashboard</h2>
          <p>Deploy and configure cab dispatch logistics. Create new employee ride schedules instantly.</p>
          
          <button
            className="primary-btn"
            onClick={() => navigate("/hr-book-cab")}
          >
            Book Cab Service
          </button>
        </div>

        {/* STATS PANELS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-card-title">Total Corporate Trips</span>
            <span className="stat-card-value">{stats.totalBookings}</span>
          </div>

          <div className="stat-card">
            <span className="stat-card-title">Active Cab Requests</span>
            <span className="stat-card-value">{stats.activeBookings}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ItDashboard;
