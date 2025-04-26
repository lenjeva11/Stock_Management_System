// src/App.jsx
// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import page components
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Stock from "./pages/Stock";

// Import shared components
import Navbar from "./components/Navbar";
import Table from "./components/Table";   
import Modal from "./components/Modal";   

// Define main App component
function App() {
  // Render Router with Navbar and route definitions
  return (
    <Router>
      {/* Navbar component displayed on all pages */}
      <Navbar />

      {/* Define routes for different pages */}
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard page */}
        <Route path="/users" element={<Users />} /> {/* Users management page */}
        <Route path="/products" element={<Products />} /> {/* Products management page */}
        <Route path="/stock" element={<Stock />} /> {/* Stock management page */}
      </Routes>
    </Router>
  );
}

// Export App component as default export
export default App;
