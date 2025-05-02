import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";

const Stock = () => {
  const [movements, setMovements] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productId: "", type: "in", quantity: "" });
  const [showModal, setShowModal] = useState(false);

  const fetchMovements = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stock");
      const data = await res.json();

      // Format date here
      const formatted = data.map((m) => ({
        ...m,
        date: new Date(m.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      setMovements(formatted);
    } catch (err) {
      console.error("Error fetching stock movements:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchMovements();
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ productId: "", type: "in", quantity: "" });
      setShowModal(false);
      fetchMovements();
    } catch (err) {
      console.error("Error saving stock movement:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-700">Manage Stock Movements</h2>
        <button
          onClick={() => {
            setForm({ productId: "", type: "in", quantity: "" });
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Stock Movement
        </button>
      </div>

      <Table
        data={movements}
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
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
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
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Stock;
