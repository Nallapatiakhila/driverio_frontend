import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Clock from "../common/Clock";
import WeatherWidget from "../common/WeatherWidget";
import axios from "axios";
import "./BookCab.css";
import "../Dashboard.css";

function BookCab() {
  const navigate = useNavigate();
  const [employeeName, setEmployeeName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [cabType, setCabType] = useState("Cab");
  const [loading, setLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  React.useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setHrEmail(email);
    }
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://driverio-backend-1.onrender.com/api/hr/book",
        {
          employeeName,
          hrEmail,
          pickup,
          dropLocation,
          pickupTime,
          cabType
        }
      );

      alert("Booking Successful!");
      setBookingDetails(response.data);
      
      // Clear form inputs on success
      setEmployeeName("");
      const email = localStorage.getItem("email") || "";
      setHrEmail(email);
      setPickup("");
      setDropLocation("");
      setPickupTime("");
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response) {
        alert("Booking failed: " + error.response.data);
      } else {
        alert("Booking failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
            className="menu-btn"
            onClick={() => navigate("/hr-dashboard")}
          >
            📊 Dashboard Overview
          </button>

          <button
            className="menu-btn active"
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

        <div className="bookcab-grid-layout">
          <div className="bookcab-card">
            <h2 className="bookcab-title">Book a Ride</h2>
            <p className="bookcab-subtitle">Create a dispatch request for company employees</p>

            <form onSubmit={handleBooking} className="bookcab-form">
              <div className="form-group">
                <label>Passenger Name</label>
                <input
                  type="text"
                  placeholder="Enter employee's name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Coordinating HR Email</label>
                <input
                  type="email"
                  placeholder="your.email@company.com"
                  value={hrEmail}
                  onChange={(e) => setHrEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Pickup Location</label>
                <input
                  type="text"
                  placeholder="Address or Landmark"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Drop-off Location</label>
                <input
                  type="text"
                  placeholder="Office, Airport, etc."
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Scheduled Pickup Time</label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label>Cab Classification</label>
                <select
                  value={cabType}
                  onChange={(e) => setCabType(e.target.value)}
                  disabled={loading}
                >
                  <option value="Cab">Standard Cab (Sedan)</option>
                  <option value="Van">Transport Van (SUV/MPV)</option>
                </select>
              </div>

              <button type="submit" className="primary-btn" disabled={loading}>
                {loading ? "Scheduling..." : "Schedule Ride"}
              </button>
            </form>
          </div>

          {/* BOOKING DETAILS PREVIEW CARD */}
          {bookingDetails && (
            <div className="booking-result-card animate-slide-right">
              <h3>🚗 Trip Scheduled</h3>
              <p className="result-notice">Please share the trip OTP with the passenger.</p>
              
              <div className="result-details-grid">
                <div className="detail-item">
                  <span className="detail-label">Assigned Driver</span>
                  <span className="detail-value">{bookingDetails.driverEmail || "Searching for driver..."}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Security OTP</span>
                  <span className="detail-value highlight-otp">{bookingDetails.otp}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pickup Point</span>
                  <span className="detail-value">{bookingDetails.pickup}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Destination</span>
                  <span className="detail-value">{bookingDetails.dropLocation}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Estimated Drop Time</span>
                  <span className="detail-value">{bookingDetails.dropTime || "-"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ride Status</span>
                  <span className="detail-value status-indicator-badge">{bookingDetails.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BookCab;
