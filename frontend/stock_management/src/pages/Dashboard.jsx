// Import Link component for navigation
import { Link } from 'react-router-dom';

// Define Dashboard functional component
export default function Dashboard() {
  // Render dashboard UI with navigation links
  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      {/* Link to Manage Users page */}
      <Link to="/users" className="block text-blue-600 underline">Manage Users</Link>
      {/* Link to Manage Products page */}
      <Link to="/products" className="block text-blue-600 underline">Manage Products</Link>
      {/* Link to Stock In/Out page */}
      <Link to="/stock" className="block text-blue-600 underline">Stock In/Out</Link>
    </div>
  );
}
