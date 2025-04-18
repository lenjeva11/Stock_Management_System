const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    type: { type: String, enum:['IN', 'OUT']},
    quantity: Number,
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Stock', stockSchema);