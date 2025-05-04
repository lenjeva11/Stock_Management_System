const mongoose = require("mongoose");
const Stock = require("./Stock"); // Import Stock model

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  price: Number,
});


module.exports = mongoose.model("Product", ProductSchema);
