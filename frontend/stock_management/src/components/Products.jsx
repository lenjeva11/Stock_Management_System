import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Products() {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    sold: '',
    price: '',
    status: 'Published',
    imageUrl: '',
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const openAddModal = () => {
    setFormData({
      name: '',
      category: '',
      stock: '',
      sold: '',
      price: '',
      status: 'Published',
      imageUrl: '',
    })
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const openViewModal = (product) => {
    setSelectedProduct(product)
    setShowViewModal(true)
  }

  const closeViewModal = () => {
    setShowViewModal(false)
    setSelectedProduct(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price) {
      alert('Please fill in required fields')
      return
    }
    try {
      const newProductData = {
        name: formData.name,
        category: formData.category,
        quantity: Number(formData.stock) || 0,
        sold: Number(formData.sold) || 0,
        price: Number(formData.price),
        status: formData.status,
        imageUrl: formData.imageUrl || 'https://via.placeholder.com/24',
      }
      const response = await axios.post('http://localhost:5000/api/products', newProductData)
      setProducts(prev => [...prev, response.data])
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      setProducts(prev => prev.filter(p => p._id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  return (
    <main className="bg-gradient-to-r from-white to-[#e6e0f7] min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-black font-semibold text-base md:text-lg">Stock</h2>
          <button
            onClick={openAddModal}
            className="inline-flex items-center rounded-md border border-indigo-700 bg-indigo-700 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-800 focus:outline-none"
          >
            <i className="fas fa-plus mr-2 text-sm"></i>
            Add Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-600 text-xs md:text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="pr-6 py-3 w-12">Sn</th>
                <th className="pr-6 py-3 min-w-[180px]">Product Name</th>
                <th className="pr-6 py-3 w-28">Category</th>
                <th className="pr-6 py-3 w-20 cursor-pointer select-none">
                  Stock
                  <i className="fas fa-sort-down ml-1 text-gray-400 text-xs"></i>
                </th>
                <th className="pr-6 py-3 w-20">Sold</th>
                <th className="pr-6 py-3 w-20">Price</th>
                <th className="pr-6 py-3 w-32">Status</th>
                <th className="pr-2 py-3 w-12">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-xs md:text-sm">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={index % 2 === 1 ? 'bg-indigo-700 text-white' : 'bg-white'}
                >
                  <td className={`pr-6 py-3 font-semibold ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </td>
                  <td className={`pr-6 py-3 flex items-center space-x-3 ${index % 2 === 1 ? 'text-white' : 'text-gray-700'}`}>
                    <img
                      alt={`${product.name} icon`}
                      className="w-6 h-6"
                      src={product.imageUrl}
                      width="24"
                      height="24"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className={`pr-6 py-3 font-semibold ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    {product.category}
                  </td>
                  <td className={`pr-6 py-3 font-semibold ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    {product.quantity}
                  </td>
                  <td className={`pr-6 py-3 font-semibold ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    {product.sold}
                  </td>
                  <td className={`pr-6 py-3 font-semibold ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    ${product.price}
                  </td>
                  <td className={`pr-6 py-3 font-semibold flex items-center space-x-3 ${index % 2 === 1 ? 'text-white' : 'text-gray-500'}`}>
                    <span>{product.status}</span>
                    <button
                      onClick={() => openViewModal(product)}
                      className={`${index % 2 === 1 ? 'text-indigo-300' : 'text-indigo-700'} text-xs font-semibold hover:underline focus:outline-none`}
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className={`${index % 2 === 1 ? 'text-indigo-300' : 'text-indigo-700'} text-xs font-semibold hover:underline focus:outline-none ml-2`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium mb-1">
                  Stock
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div>
                <label htmlFor="sold" className="block text-sm font-medium mb-1">
                  Sold
                </label>
                <input
                  id="sold"
                  name="sold"
                  type="number"
                  min="0"
                  value={formData.sold}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Product Status</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Stock:</strong> {selectedProduct.quantity}</p>
              <p><strong>Sold:</strong> {selectedProduct.sold}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Status:</strong> {selectedProduct.status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Products
