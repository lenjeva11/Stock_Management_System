const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Stock = require('../models/Stock'); // Make sure you import Stock model!

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Create a product
router.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Update a product
router.put('/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a product (and its stock movements)
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Delete the product using findOneAndDelete to trigger middleware
    await Product.findOneAndDelete({ _id: productId });
    // Middleware will delete related stock movements
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting product and stock movements:", error);
    res.status(500).json({ error: "Failed to delete product and related stock movements" });
  }
});

module.exports = router;
