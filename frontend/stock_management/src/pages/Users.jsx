import React, { useEffect, useState } from "react";
import Table from "../components/Table";      
import Modal from "../components/Modal";  

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/api/users/${editingId}`
      : "http://localhost:5000/api/users";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setForm({ username: "", password: "" });
      setEditingId(null);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, password: user.password });
    setEditingId(user._id);
    setShowModal(true); // Open Modal
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

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


      <Table
        data={users}
        columns={[{ key: "username", label: "Username" }]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      
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

export default Users;
