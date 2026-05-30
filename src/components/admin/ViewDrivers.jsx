import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewDrivers = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://driverio-backend-1.onrender.com/api/admin/view-drivers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDrivers(response.data);
    } catch (error) {
      console.error("Failed to fetch drivers", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍✈️ All Registered Drivers</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Cab Type</th>
            <th>Available?</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>{d.cabType}</td>
              <td>{d.available ? "✅ Yes" : "❌ No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDrivers;
