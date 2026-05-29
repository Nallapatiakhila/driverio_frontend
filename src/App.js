import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import AdminBookings from "./components/AdminBookings";
import DriverDashboard from "./components/driver/DriverDashboard";
import BookCab from "./components/hr/BookCab";
import MyBookings from "./components/hr/MyBookings";
import HrDashBoard from "./components/HrDashBoard";
import ItDashboard from "./components/ItDashboard";
import TopBar from "./components/TopBar";

function App() {
  return (
    <BrowserRouter>
    <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reg" element={<Register />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-bookings" element={<AdminBookings />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/hr-dashboard" element={<HrDashBoard />} />
        <Route path="/it-dashboard" element={<ItDashboard />} />
        <Route path="/hr-book-cab" element={<BookCab />} />
        <Route path="/hr-my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
