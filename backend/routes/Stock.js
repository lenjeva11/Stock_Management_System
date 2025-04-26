// Import express framework
const express = require("express");
// Create a new router object
const router = express.Router();
// Import Stock model
const Stock = require("../models/Stock");
// Import Product model
const Product = require("../models/Product");

// GET all stock movements
router.get("/", async (req, res) => {
  try {
    // Find all stock movements and populate product details
    const movements = await Stock.find().populate("productId");
    // Format the movements for response
    const formatted = movements.map((m) => ({
      _id: m._id, // Movement ID
      productName: m.productId?.name || "Unknown", // Product name or Unknown
      type: m.type, // Movement type (in/out)
      quantity: m.quantity, // Quantity moved
      date: m.date, // Date of movement
    }));

    // Send formatted movements as JSON response
    res.json(formatted);
  } catch (err) {
    // Log error and send server error response
    console.error("Failed to fetch stock:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST stock movement
router.post("/", async (req, res) => {
  try {
    // Extract fields from request body
    const { productId, type, quantity } = req.body;

    // Validate required fields
    if (!productId || !type || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new Stock instance
    const newStock = new Stock({
      productId,
      type,
      quantity: Number(quantity),
    });

    // Save new stock movement to database
    await newStock.save();
    // Send created stock movement with 201 status
    res.status(201).json(newStock);
  } catch (err) {
    // Log error and send failure response
    console.error("Error saving stock movement:", err);
    res.status(500).json({ message: "Failed to save stock movement" });
  }
});

// Export the router
module.exports = router;
