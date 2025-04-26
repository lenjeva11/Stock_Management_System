// Import mongoose library for MongoDB object modeling
const mongoose = require("mongoose");

// Define a new schema for Stock collection
const StockSchema = new mongoose.Schema({
  // Reference to Product model, required field
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  // Type of stock movement: "in" or "out", required field
  type: {
    type: String,
    enum: ["in", "out"],
    required: true,
  },
  // Quantity of stock moved, required field
  quantity: {
    type: Number,
    required: true,
  },
  // Date of stock movement, defaults to current date
  date: {
    type: Date,
    default: Date.now,
  },
});

// Export the Stock model based on StockSchema
module.exports = mongoose.model("Stock", StockSchema);
