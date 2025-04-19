import { useState, useEffect } from 'react'

function Users() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [formData, setFormData] = useState({ username: '', password: '' })

  useEffect(() => {
    // Load dummy users data
    setUsers([
      { id: 1, username: 'admin', role: 'Admin', status: 'Active', createdAt: '2023-01-01' },
      { id: 2, username: 'user1', role: 'User', status: 'Inactive', createdAt: '2023-02-15' },
      { id: 3, username: 'user2', role: 'User', status: 'Active', createdAt: '2023-03-10' },
      { id: 4, username: 'user3', role: 'User', status: 'Active', createdAt: '2023-04-05' },
      { id: 5, username: 'user4', role: 'User', status: 'Inactive', createdAt: '2023-05-20' },
      { id: 6, username: 'user5', role: 'User', status: 'Active', createdAt: '2023-06-01' },
    ])
  }, [])

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const openAddModal = () => {
    setEditUser(null)
    setFormData({ username: '', password: '' })
    setShowModal(true)
  }

  const openEditModal = (user) => {
    setEditUser(user)
    setFormData({ username: user.username, password: '' })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editUser) {
      // Update user
      setUsers(users.map(u => (u.id === editUser.id ? { ...u, username: formData.username } : u)))
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        username: formData.username,
        role: 'User',
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0],
      }
      setUsers([...users, newUser])
    }
    setShowModal(false)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users Management</h2>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New User
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Username</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Created Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4">{user.status}</td>
                <td className="py-2 px-4">{user.createdAt}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-primary text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{editUser ? 'Edit User' : 'Add New User'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editUser}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-primary text-white hover:bg-blue-700"
                >
                  {editUser ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users
