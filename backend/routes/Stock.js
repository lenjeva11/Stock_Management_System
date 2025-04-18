const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const Product = require('../models/Product');


//Handle Stock in/out
router.post('/', async (req, res) =>{
    const {productId, type, quantity} = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found'});

    const newQty = type === "IN" ? product.quantity + Number(quantity) : product.quantity - Number(quantity);

    if (newQty < 0) return res.status(400).json({ message: 'Insufficient Stock'});

    const stock = new Stock({ product: productId, type, quantity });
    await stock.save();

    
    res.json(stock);
});

module.exports = router;