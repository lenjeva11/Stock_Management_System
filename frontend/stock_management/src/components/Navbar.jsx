import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or authentication tokens
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-700">
              Apade Stock Management
            </Link>
          </div>

          {/* Right side - Navigation Links */}
          <div className="flex space-x-6 items-center">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/users"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Users
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Products
            </Link>
            <Link
              to="/stock"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Stock
            </Link>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
