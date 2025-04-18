const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) =>{
    const { username, password } = req.body;

    const user = await User.findOne({ username});
    if (!user || user.password !== password){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({ userId: user._id}, 'secret', {expiresIn: '1d'});
    res.json({ token });    
});

module.exports = router;