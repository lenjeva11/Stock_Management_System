import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    type: "in",
    quantity: "",
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch products for dropdown
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  // Fetch stock movements
  const fetchMovements = async () => {
    const res = await fetch("http://localhost:5000/api/stock");
    const data = await res.json();
    setMovements(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchMovements();
  }, []);

  // Update form state on change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      // Reset form
      setForm({ productId: "", type: "in", quantity: "" });
      setShowModal(false);
      fetchMovements();
    } catch (err) {
      console.error("Error saving stock movement:", err);
    }
  };

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

export default Stock;
