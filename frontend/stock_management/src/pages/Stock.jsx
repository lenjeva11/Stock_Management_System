// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from "react";
// Import Table component for displaying data
import Table from "../components/Table";
// Import Modal component for form dialogs
import Modal from "../components/Modal";

// Define Stock functional component
const Stock = () => {
  // State to hold list of products for dropdown
  const [products, setProducts] = useState([]);
  // State to hold list of stock movements
  const [movements, setMovements] = useState([]);
  // State to hold form data for stock movement create
  const [form, setForm] = useState({
    productId: "",
    type: "in",
    quantity: "",
  });
  // State to control visibility of modal dialog
  const [showModal, setShowModal] = useState(false);

  // Fetch products for dropdown
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data); // Update products state with fetched data
  };

  // Fetch stock movements
  const fetchMovements = async () => {
    const res = await fetch("http://localhost:5000/api/stock");
    const data = await res.json();
    setMovements(data); // Update movements state with fetched data
  };

  // useEffect hook to fetch products and movements on component mount
  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, []);

  // Update form state on input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating stock movement
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend API
      const res = await fetch("http://localhost:5000/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity), // ensure quantity is numeric
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save stock movement");
      }

      // Reset form and close modal
      setForm({ productId: "", type: "in", quantity: "" });
      setShowModal(false);
      fetchMovements(); // Refresh stock movements list
    } catch (err) {
      console.error("Error saving stock movement:", err);
    }
  };

  // Render component UI
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Stock</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Stock Movement
        </button>
      </div>

      {/* Render Table component with stock movements data */}
      <Table
        data={movements.map((item) => ({
          ...item,
          date: new Date(item.date).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        }))}
        columns={[
          { key: "productName", label: "Product" },
          { key: "type", label: "Type" },
          { key: "quantity", label: "Quantity" },
          { key: "date", label: "Date" },
        ]}
      />

      {/* Render Modal component for stock movement form */}
      <Modal
        isOpen={showModal}
        title="Add Stock Movement"
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="productId"
            value={form.productId}
            onChange={handleChange}
            required
            className="w-full border p-2"
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full border p-2"
          >
            <option value="in">Stock In</option>
            <option value="out">Stock Out</option>
          </select>

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

// Export Stock component as default export
export default Stock;
