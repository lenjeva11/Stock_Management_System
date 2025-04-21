// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-6">
      <Link to="/dashboard" className="hover:text-yellow-300">
        🏠 Dashboard
      </Link>
      <Link to="/users" className="hover:text-yellow-300">
        👤 Users
      </Link>
      <Link to="/products" className="hover:text-yellow-300">
        📦 Products
      </Link>
      <Link to="/stock" className="hover:text-yellow-300">
        📊 Stock
      </Link>
    </nav>
  );
};

export default Navbar;
