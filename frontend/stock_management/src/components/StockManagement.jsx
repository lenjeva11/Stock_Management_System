import { useState, useEffect } from 'react'

function StockManagement() {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [type, setType] = useState('IN')
  const [quantity, setQuantity] = useState(0)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
      if (data.length > 0) setSelectedProductId(data[0]._id)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleStockUpdate = async () => {
    if (!selectedProductId || quantity <= 0) {
      setError('Please select a product and enter a valid quantity')
      return
    }
    try {
      const res = await fetch('http://localhost:5000/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: selectedProductId, type, quantity: Number(quantity) }),
      })
      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.message || 'Failed to update stock')
      }
      const data = await res.json()
      setMessage(`Stock updated: ${type} ${quantity}`)
      setError('')
      setQuantity(0)
    } catch (err) {
      setError(err.message)
      setMessage('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Stock Management</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Product:
          <select
            className="block w-full border border-gray-300 rounded p-2"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Type:
          <select
            className="block w-full border border-gray-300 rounded p-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">
          Quantity:
          <input
            className="block w-full border border-gray-300 rounded p-2"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleStockUpdate}
      >
        Update Stock
      </button>
    </div>
  )
}

export default StockManagement
