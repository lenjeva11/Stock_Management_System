import { useState, useEffect } from 'react'
import ProductForm from './ProductForm.jsx'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleSaveProduct = async (product) => {
    try {
      let res
      if (product._id) {
        res = await fetch(`http://localhost:5000/products/${product._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      } else {
        res = await fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      }
      if (!res.ok) throw new Error('Failed to save product')
      const savedProduct = await res.json()
      if (product._id) {
        setProducts(products.map((p) => (p._id === savedProduct._id ? savedProduct : p)))
      } else {
        setProducts([...products, savedProduct])
      }
      setEditingProduct(null)
      setError(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete product')
      setProducts(products.filter((p) => p._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mb-4">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between items-center mb-2 border-b pb-2">
            <span>
              {product.name} - Quantity: {product.quantity}
            </span>
            <div>
              <button
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
      <ProductForm
        productToEdit={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => setEditingProduct(null)}
      />
    </div>
  )
}

export default ProductList
