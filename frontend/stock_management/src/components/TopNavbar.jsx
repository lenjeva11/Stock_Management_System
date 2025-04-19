import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TopNavbar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary">
          <option>All</option>
          <option>Users</option>
          <option>Products</option>
          <option>Stock In</option>
          <option>Stock Out</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-700">Admin User</div>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default TopNavbar
