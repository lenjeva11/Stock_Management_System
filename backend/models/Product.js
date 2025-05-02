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

// Middleware to delete stock movements linked to the product
ProductSchema.pre("findOneAndDelete", async function (next) {
  const productId = this.getQuery()["_id"];
  await Stock.deleteMany({ product: productId });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
