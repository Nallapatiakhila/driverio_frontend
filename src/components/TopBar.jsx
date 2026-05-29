import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function TopBar() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const API_KEY = "59f598e860733fb19ae67d1813bd2f6d";

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        // Capitalize description
        const descCap = desc.charAt(0).toUpperCase() + desc.slice(1);
        setWeather(`Hyderabad ${temp}°C, ${descCap}`);
      })
      .catch(() => {
        setWeather("Weather unavailable");
      });

    return () => clearInterval(interval);
  }, []);

  // Update user state when token changes or page changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.sub || localStorage.getItem("email") || "",
          role: decoded.role || ""
        });
      } catch (err) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const formatRole = (role) => {
    if (!role) return "";
    return role.toUpperCase();
  };

  return (
    <header className="global-header">
      <div className="header-brand" onClick={() => navigate("/")}>
        <div className="brand-logo-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        </div>
        <span className="brand-logo-text">Driverio</span>
      </div>

      <div className="header-actions">
        <div className="header-status-pill">
          <span className="weather-indicator">🌤 {weather}</span>
          <span className="divider-line">|</span>
          <span className="time-indicator">🕒 {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>

        {user ? (
          <div className="header-user-profile">
            <span className="user-email">{user.email}</span>
            <span className={`user-role-badge badge-${user.role}`}>
              {formatRole(user.role)}
            </span>
            <button className="header-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          location.pathname !== "/login" && location.pathname !== "/reg" && (
            <div className="header-auth-buttons">
              <button className="header-login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            </div>
          )
        )}
      </div>
    </header>
  );
}

export default TopBar;
