// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from "react";
// Import Table component for displaying data
import Table from "../components/Table";      
// Import Modal component for form dialogs
import Modal from "../components/Modal";  

// Define Users functional component
const Users = () => {
  // State to hold list of users
  const [users, setUsers] = useState([]);
  // State to hold form data for user create/edit
  const [form, setForm] = useState({ username: "", password: "" });
  // State to hold id of user being edited, null if creating new
  const [editingId, setEditingId] = useState(null);
  // State to control visibility of modal dialog
  const [showModal, setShowModal] = useState(false);

  // Fetch users from backend API
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data); // Update users state with fetched data
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // useEffect hook to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine HTTP method and URL based on editing state
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/users/${editingId}`
      : "http://localhost:5000/api/users";

    try {
      // Send request to backend API
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Reset form and state after successful submission
      setForm({ username: "", password: "" });
      setEditingId(null);
      setShowModal(false);
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // Handle edit button click, populate form with user data
  const handleEdit = (user) => {
    setForm({ username: user.username, password: user.password });
    setEditingId(user._id);
    setShowModal(true); // Open Modal
  };

  // Handle delete button click, delete user by id
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Render component UI
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Users</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setForm({ username: "", password: "" });
            setShowModal(true); // Open modal to add
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>


      {/* Render Table component with user data and handlers */}
      <Table
        data={users}
        columns={[{ key: "username", label: "Username" }]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      
      {/* Render Modal component for user form */}
      <Modal
        isOpen={showModal}
        title={editingId ? "Edit User" : "Add User"}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

// Export Users component as default export
export default Users;
