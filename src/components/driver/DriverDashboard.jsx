import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../common/Clock";
import WeatherWidget from "../common/WeatherWidget";
import axios from "axios";
import "../Dashboard.css";

const DriverDashboard = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyTrips();
  }, []);

  const fetchMyTrips = async () => {
    const token = localStorage.getItem("token");
    const driverEmail = localStorage.getItem("email");

    try {
      const response = await axios.get(`https://driverio-backend-1.onrender.com/api/driver/mytrips?email=${driverEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching driver trips", error);
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
            className="menu-btn active"
            onClick={() => navigate("/driver-dashboard")}
          >
            🚗 My Assigned Trips
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
          <h2>Driver Work Desk</h2>
          <p>Review and execute assignments. Securely verify rides using passenger OTPs.</p>
        </div>

        <div className="bookings-table-wrapper" style={{ border: "1px solid var(--border-color)", padding: "2rem", borderRadius: "20px", background: "rgba(20, 24, 38, 0.45)" }}>
          <h3 style={{ margin: "0 0 1.5rem 0", color: "var(--text-primary)" }}>Assigned Transport Tasks</h3>

          {trips.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>No trips assigned today.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Passenger Employee</th>
                    <th>Pickup location</th>
                    <th>Drop location</th>
                    <th>Schedule Time</th>
                    <th>Cab Type</th>
                    <th>Trip Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip.id}>
                      <td>#{trip.id}</td>
                      <td><strong>{trip.employeeName}</strong></td>
                      <td>{trip.pickup}</td>
                      <td>{trip.dropLocation}</td>
                      <td>{trip.pickupTime}</td>
                      <td>{trip.cabType}</td>
                      <td>
                        <span className={`status-pill ${getStatusClass(trip.status)}`}>
                          {trip.status}
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

export default DriverDashboard;
