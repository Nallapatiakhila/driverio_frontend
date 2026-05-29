# 🚕 Driverio - Enterprise Logistics & Cab Coordination Platform

Driverio is a premium, modern, role-based corporate logistics and cab coordination platform. It enables seamless integration between different departments—HR, IT, Drivers, and Administrators—while offering an interactive AI Dispatcher assistant and Hyderabad weather intelligence to coordinate corporate transportation efficiently.

---
## Live Demo
((https://driverio-frontend.vercel.app/))

## 🚀 Key Features

*   **🔒 Secure Role-Based Authentication**
    *   Dynamic dashboards customized for **Admin**, **HR**, **IT Support**, and **Drivers**.
    *   Strict routing and state-driven dashboard rendering using JWT decoding.
*   **🚕 Instant Trip Booking & Management**
    *   HR users can seamlessly book new cab rides for corporate staff.
    *   "My Bookings" log displays real-time trip status, driver details, and scheduling information.
*   **🌤 Weather Intelligence**
    *   Deep integration with weather forecasting services (configured for Hyderabad region) to anticipate road conditions, visibility, and traffic delays.
*   **🔑 Secure Driver Verification**
    *   One-time verification keys (OTP) for on-the-spot driver authentication before trip commencement.
*   **🤖 AI Dispatcher Integration**
    *   Interactive, floating AI assistant capable of answering questions, helping with schedules, and providing booking insights.
*   **✨ Premium Glassmorphic UI/UX**
    *   Curated responsive dark/light elements, dynamic hover animations, elegant micro-interactions, and beautiful components customized for each role.

---

## 🛠 Tech Stack

*   **Core Framework:** React 19, React Router DOM (v7)
*   **Styling & Design System:** Custom Vanilla CSS (Sleek Modern Palette, Glassmorphism, Micro-animations)
*   **State & API Handling:** Axios, JWT Decode, Web Vitals
*   **Development Server:** React Scripts

---

## 📐 Project Structure

```bash
src/
├── components/
│   ├── admin/             # Admin-specific modules
│   ├── driver/            # Driver-specific modules
│   ├── hr/                # HR-specific modules & cab booking UI
│   ├── AIChat.jsx         # Floating AI Assistant
│   ├── AdminBookings.jsx  # Admin-level bookings list
│   ├── AdminDashboard.jsx # Admin management portal
│   ├── Home.jsx           # Premium Landings / Splash Screen
│   ├── HrDashBoard.jsx    # HR operations center
│   ├── ItDashboard.jsx    # IT diagnostics & telemetry portal
│   ├── Layout.jsx         # Main navigation Shell & Wrapper
│   ├── Login.jsx          # Secure sign-in form
│   ├── Register.jsx       # Account registration with role selections
│   └── TopBar.jsx         # Responsive global navigation header
├── styles/                # Component styles
├── App.css                # Global layout styling
├── App.js                 # Routing definitions & Application shell
├── index.css              # Typography & Main UI design systems
└── index.js               # Application Entry Point
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have **Node.js** (v18+) and **npm** installed on your system.

### 1. Installation
Clone this repository and navigate to the project directory:
```bash
git clone https://github.com/Nallapatiakhila/driverio_frontend.git
cd driverio_frontend
```

Install dependencies:
```bash
npm install
```

### 2. Run the App
Launch the local development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view Driverio in your browser!

### 3. Build for Production
To package the app for production deployment:
```bash
npm run build
```

---

## 🎨 User Dashboards Walkthrough

### 1. 💼 HR Dashboard (`/hr-dashboard`)
*   Coordinate ride allocations for team members.
*   Access **Book Cab** and **My Bookings** modules instantly.

### 2. 🚕 Driver Dashboard (`/driver-dashboard`)
*   Access active trips and routing information.
*   Complete OTP-secured verification loops on location.

### 3. 🛡 IT Support Dashboard (`/it-dashboard`)
*   Diagnose and check telemetry metrics, API statuses, and app health.

### 4. 👑 Admin Dashboard (`/admin-dashboard`)
*   Global booking management, trip approvals, and user accounts supervision.

---

## 🌟 Contributing

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
*Developed with ❤️ for secure, automated corporate logistics.*
