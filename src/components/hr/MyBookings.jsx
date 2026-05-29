import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../common/Clock";
import WeatherWidget from "../common/WeatherWidget";
import axios from "axios";
import "./MyBookings.css";
import "../Dashboard.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const email = localStorage.getItem("email") || "";
      const res = await axios.get(
        `http://localhost:8080/api/hr/all-bookings?email=${email}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getStatusClass = (status) => {
    if (!status) return "pending";
    const s = status.toLowerCase();
    if (s.includes("complete") || s.includes("success")) return "completed";
    if (s.includes("assign") || s.includes("active")) return "assigned";
    return "pending";
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
            className="menu-btn"
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
            className="menu-btn active"
            onClick={() => navigate("/hr-my-bookings")}
          >
            📄 View My Bookings
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

        <div className="bookings-table-wrapper">
          <h2 className="bookings-title">My Bookings</h2>
          <p className="bookings-subtitle">Overview of dispatch transport requests submitted by HR</p>

          {bookings.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>No bookings available.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Passenger</th>
                    <th>Pickup Point</th>
                    <th>Destination</th>
                    <th>Cab Type</th>
                    <th>Assigned Driver</th>
                    <th>Security OTP</th>
                    <th>Weather Log</th>
                    <th>Ride Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.employeeName}</strong></td>
                      <td>{b.pickup}</td>
                      <td>{b.dropLocation}</td>
                      <td>{b.cabType}</td>
                      <td>
                        <span style={{ fontFamily: "monospace", fontSize: "0.85rem" }}>
                          {b.driverEmail || "Waiting assignment..."}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: "monospace", fontWeight: "700", color: "var(--accent-warning)", letterSpacing: "1px" }}>
                          {b.otp || "-"}
                        </span>
                      </td>
                      <td>{b.weatherInfo || b.weather || "-"}</td>
                      <td>
                        <span className={`status-pill ${getStatusClass(b.status)}`}>
                          {b.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
