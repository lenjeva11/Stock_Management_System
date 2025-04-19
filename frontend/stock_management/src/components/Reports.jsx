import { useState } from 'react'

function Reports() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [productFilter, setProductFilter] = useState('')

  // Dummy data for charts and stats
  const totalStockIn = 1000
  const totalStockOut = 800
  const currentStock = 200

  const topInStock = [
    { id: 1, name: 'Product A', quantity: 300 },
    { id: 2, name: 'Product B', quantity: 250 },
    { id: 3, name: 'Product C', quantity: 200 },
    { id: 4, name: 'Product D', quantity: 150 },
    { id: 5, name: 'Product E', quantity: 100 },
  ]

  const topOutStock = [
    { id: 1, name: 'Product F', quantity: 280 },
    { id: 2, name: 'Product G', quantity: 230 },
    { id: 3, name: 'Product H', quantity: 190 },
    { id: 4, name: 'Product I', quantity: 140 },
    { id: 5, name: 'Product J', quantity: 90 },
  ]

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
        <div className="mb-4 sm:mb-0">
          <label className="block mb-1 font-medium">From</label>
          <input
            type="date"
            name="from"
            value={dateRange.from}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="mb-4 sm:mb-0">
          <label className="block mb-1 font-medium">To</label>
          <input
            type="date"
            name="to"
            value={dateRange.to}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Product</label>
          <input
            type="text"
            placeholder="Filter by product"
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-semibold mb-2">Total Stock In</h3>
          <p className="text-2xl font-bold text-green-600">{totalStockIn}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-semibold mb-2">Total Stock Out</h3>
          <p className="text-2xl font-bold text-red-600">{totalStockOut}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h3 className="font-semibold mb-2">Current Stock</h3>
          <p className="text-2xl font-bold text-primary">{currentStock}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-4">Top 5 In-stock Products</h3>
          <ul>
            {topInStock.map(product => (
              <li key={product.id} className="flex justify-between border-b py-2">
                <span>{product.name}</span>
                <span>{product.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-4">Top 5 Out-stock Products</h3>
          <ul>
            {topOutStock.map(product => (
              <li key={product.id} className="flex justify-between border-b py-2">
                <span>{product.name}</span>
                <span>{product.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">Export CSV</button>
        <button className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700">Export PDF</button>
      </div>
    </div>
  )
}

export default Reports
