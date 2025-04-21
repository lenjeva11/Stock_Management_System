const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");
const Product = require("../models/Product");

// GET all stock movements
router.get("/", async (req, res) => {
  try {
    const movements = await Stock.find().populate("productId");
    const formatted = movements.map((m) => ({
      _id: m._id,
      productName: m.productId?.name || "Unknown",
      type: m.type,
      quantity: m.quantity,
      date: m.date,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Failed to fetch stock:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST stock movement
router.post("/", async (req, res) => {
  try {
    const { productId, type, quantity } = req.body;

    if (!productId || !type || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStock = new Stock({
      productId,
      type,
      quantity: Number(quantity),
    });

    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    console.error("Error saving stock movement:", err);
    res.status(500).json({ message: "Failed to save stock movement" });
  }
});

module.exports = router;
