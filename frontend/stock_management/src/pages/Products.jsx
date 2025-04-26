// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from "react";
// Import Table component for displaying data
import Table from "../components/Table";
// Import Modal component for form dialogs
import Modal from "../components/Modal";

// Define Products functional component
const Products = () => {
  // State to hold list of products
  const [products, setProducts] = useState([]);
  // State to hold form data for product create/edit
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  // State to hold id of product being edited, null if creating new
  const [editingId, setEditingId] = useState(null);
  // State to control visibility of modal dialog
  const [showModal, setShowModal] = useState(false);

  // Fetch products from backend API
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data); // Update products state with fetched data
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // useEffect hook to fetch products on component mount
  useEffect(() => {
    fetchProducts();
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
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";

    try {
      // Send request to backend API
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Reset form and state after successful submission
      setForm({ name: "", category: "", price: "" });
      setEditingId(null);
      setShowModal(false);
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Handle edit button click, populate form with product data
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
    });
    setEditingId(product._id);
    setShowModal(true);
  };

  // Handle delete button click, delete product by id
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts(); // Refresh product list
  };

  // Render component UI
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => {
            setEditingId(null); // Clear editing state
            setForm({ name: "", category: "", price: "" }); // Reset form
            setShowModal(true); // Show modal for new product
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* Render Table component with product data and handlers */}
      <Table
        data={products}
        columns={[
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
        ]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Render Modal component for product form */}
      <Modal
        isOpen={showModal}
        title={editingId ? "Edit Product" : "Add Product"}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

// Export Products component as default export
export default Products;
