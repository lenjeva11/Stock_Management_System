import { useState, useEffect } from 'react'
import axios from 'axios'

function StockOut() {
  const [stockOuts, setStockOuts] = useState([])
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ productId: '', quantity: '' })

  useEffect(() => {
    fetchProducts()
    fetchStockOuts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // Note: Backend does not have GET for stock records, so we keep local state or implement if needed
  const fetchStockOuts = () => {
    // For now, keep empty or local state
    setStockOuts([])
  }

  const openModal = () => {
    setFormData({ productId: '', quantity: '' })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.productId) {
      alert('Please select a product')
      return
    }
    if (!formData.quantity || isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
      alert('Please enter a valid quantity')
      return
    }
    try {
      const payload = {
        productId: formData.productId,
        type: 'OUT',
        quantity: Number(formData.quantity),
      }
      const response = await axios.post('http://localhost:5000/api/stock', payload)
      // Update local stockOuts state to include new record
      const product = products.find(p => p._id === formData.productId)
      const newStockOut = {
        id: stockOuts.length + 1,
        productName: product ? product.name : '',
        quantity: Number(formData.quantity),
        date: new Date().toISOString().split('T')[0],
      }
      setStockOuts([...stockOuts, newStockOut])
      setShowModal(false)
    } catch (error) {
      console.error('Error adding stock out:', error)
      alert(error.response?.data?.message || 'Failed to add stock out')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Stock Out</h2>
        <button
          onClick={openModal}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Stock Out
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {stockOuts.map(record => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{record.id}</td>
                <td className="py-2 px-4">{record.productName}</td>
                <td className="py-2 px-4">{record.quantity}</td>
                <td className="py-2 px-4">{record.date}</td>
              </tr>
            ))}
            {stockOuts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No stock-out records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Stock Out</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Product</label>
                <select
                  name="productId"
                  value={formData.productId}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StockOut
