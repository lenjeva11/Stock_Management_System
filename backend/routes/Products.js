
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


 //GET all products
 //Handles GET requests to "/"
 //Retrieves all products from the database and returns them as JSON
 
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    // Send products as JSON response
    res.json(products);
  } catch (err) {
    // Log error and send 500 response if fetching fails
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});


 //Handles POST requests to "/"
 //Validates input, creates a new product, saves it, and returns the created product

router.post("/", async (req, res) => {
  // Debug log incoming product data
  console.log("Incoming product:", req.body);

  try {
    // Extract product details from request body
    const { name, category, price } = req.body;

    // Validate required fields
    if (!name || !category || price === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new product instance with validated data
    const newProduct = new Product({
      name,
      category,
      price: Number(price), // Ensure price is numeric
    });

    // Save new product to the database
    await newProduct.save();
    // Send created product with 201 status
    res.status(201).json(newProduct);
  } catch (err) {
    // Log error and send 500 response if saving fails
    console.error("Error saving product:", err);
    res.status(500).json({ message: "Failed to save product" });
  }
});


 //PUT update product by ID
 //Handles PUT requests to "/:id"
 //Validates input, updates the product by ID, and returns the updated product

router.put("/:id", async (req, res) => {
  // Debug log product ID and update data
  console.log("Updating product:", req.params.id, req.body);

  try {
    // Extract updated product details from request body
    const { name, category, price } = req.body;

    // Validate required fields
    if (!name || !category || price === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find product by ID and update with new data, return updated document
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price: Number(price),
      },
      { new: true }
    );

    // If product not found, return 404 error
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send updated product as JSON response
    res.json(updatedProduct);
  } catch (err) {
    // Log error and send 500 response if update fails
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
});


 //DELETE product by ID
 //Handles DELETE requests to "/:id"
 //Deletes the product by ID and returns appropriate status
 
router.delete("/:id", async (req, res) => {
  try {
    // Find product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    // If product not found, return 404 error
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send 204 No Content status on successful deletion
    res.sendStatus(204);
  } catch (err) {
    // Log error and send 500 response if deletion fails
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
});


module.exports = router;
