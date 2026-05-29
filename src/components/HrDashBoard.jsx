import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "./common/Clock";
import WeatherWidget from "./common/WeatherWidget";
import AIChat from "./AIChat";
import axios from "axios";
import "./Dashboard.css";

const HrDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0
  });

  useEffect(() => {
    const email = localStorage.getItem("email") || "";
    axios.get(`http://localhost:8080/api/hr/all-bookings?email=${email}`)
      .then(res => {
        const bookings = res.data;
        const total = bookings.length;
        const pending = bookings.filter(b => b.status?.toLowerCase() === "pending").length;
        const completed = bookings.filter(b => b.status?.toLowerCase() === "completed").length;
        
        setStats({
          totalBookings: total,
          completedBookings: completed,
          pendingBookings: pending
        });
      })
      .catch(err => {
        console.error("Error fetching HR stats:", err);
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
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
            onClick={() => navigate("/hr-dashboard")}
          >
            📊 Dashboard Overview
          </button>

          <button
            className="menu-btn"
            onClick={() => navigate("/hr-book-cab")}
          >
            🚕 Book a Cab
          </button>

          <button
            className="menu-btn"
            onClick={() => navigate("/hr-my-bookings")}
          >
            📄 View My Bookings
          </button>
        </div>

        <button className="logout-btn" onClick={logout}>
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <Clock />
          <WeatherWidget />
        </div>

        {/* Dashboard Card */}
        <div className="dashboard-card">
          <h2>HR Dispatch Control</h2>
          <p>Request corporate transport and coordinate vehicle assignments for personnel and staff members.</p>
        </div>

        {/* STATS PANELS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-card-title">Bookings Submitted</span>
            <span className="stat-card-value">{stats.totalBookings}</span>
          </div>

          <div className="stat-card">
            <span className="stat-card-title">Pending Driver Assignment</span>
            <span className="stat-card-value">{stats.pendingBookings}</span>
          </div>

          <div className="stat-card">
            <span className="stat-card-title">Completed Rides</span>
            <span className="stat-card-value">{stats.completedBookings}</span>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <AIChat />
      </main>
    </div>
  );
};

export default HrDashboard;