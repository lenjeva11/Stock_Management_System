import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Link to="/users" className="block text-blue-600 underline">Manage Users</Link>
      <Link to="/products" className="block text-blue-600 underline">Manage Products</Link>
      <Link to="/stock" className="block text-blue-600 underline">Stock In/Out</Link>
    </div>
  );
}
