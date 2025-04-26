const mongoose = require("mongoose");

//Define a new schema for products with specific fields
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
