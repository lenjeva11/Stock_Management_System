import { useState, useEffect } from 'react'

function ProductForm({ onSave, productToEdit, onCancel }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name)
      setQuantity(productToEdit.quantity)
    }
  }, [productToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) return
    onSave({ name, quantity: Number(quantity), _id: productToEdit?._id })
    setName('')
    setQuantity(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Product Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
            required
          />
        </label>
      </div>
      <button type="submit">{productToEdit ? 'Update' : 'Add'} Product</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default ProductForm
