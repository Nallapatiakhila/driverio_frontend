import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:8080/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 All Cab Bookings</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Time</th>
            <th>Cab Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>HR Email</th>
            <th>Driver Email</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.employeeName}</td>
              <td>{booking.pickup}</td>
              <td>{booking.dropLocation}</td>
              <td>{booking.pickupTime}</td>
              <td>{booking.cabType}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.status}</td>
              <td>{booking.hrEmail}</td>
              <td>{booking.driverEmail || "Not Assigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
