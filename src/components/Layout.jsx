import React from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";

// ✅ Import clock & weather
import Clock from "./common/Clock";
import WeatherWidget from "./common/WeatherWidget";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Driverio</h2>

        {(role === "hr" || role === "it") && (
          <>
            <button onClick={() => navigate("/hr-dashboard")}>
              Dashboard
            </button>
            <button onClick={() => navigate("/hr-book-cab")}>
              Book Cab
            </button>
          </>
        )}

        {role === "admin" && (
          <button onClick={() => navigate("/admin-dashboard")}>
            Admin Panel
          </button>
        )}

        {role === "driver" && (
          <button onClick={() => navigate("/driver-dashboard")}>
            Driver Dashboard
          </button>
        )}

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* 💜 SINGLE TOPBAR ONLY */}
        <div className="topbar">
          <div className="topbar-left">
            <span>Welcome to Driverio 💜</span>
          </div>

          <div className="topbar-right">
            <Clock />
            <WeatherWidget />
          </div>
        </div>

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Layout;
