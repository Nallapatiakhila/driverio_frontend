import React, { useState } from "react";
import axios from "axios";

const AddDriver = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cabType: "Cab",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("https://driverio-backend-1.onrender.com/api/admin/add-driver", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data); // Success message from backend
      setForm({ name: "", email: "", cabType: "Cab" }); // Reset form
    } catch (error) {
      console.error("Driver add failed", error);
      setMessage("Failed to add driver");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Add New Driver</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          name="email"
          placeholder="Driver Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <select name="cabType" value={form.cabType} onChange={handleChange}>
          <option value="Cab">Cab</option>
          <option value="Van">Van</option>
        </select><br /><br />
        <button type="submit">Add Driver</button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>{message}</p>
      )}
    </div>
  );
};

export default AddDriver;
