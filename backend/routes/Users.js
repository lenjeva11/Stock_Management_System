const express = require('express'); 
const router = express.Router(); 
const User = require('../models/User');


router.get('/', async (req, res) =>{  
    const users = await User.find(); 
    res.json(users); 
});


router.post('/', async (req, res) =>{ 
    const user = new User(req.body); 
    await user.save(); 
    res.json(user); 
});


router.put('/:id', async (req, res) =>{ 
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true}); 
    res.json(updated) 
});


router.delete('/:id', async (req, res) =>{ 
    await User.findByIdAndDelete(req.params.id); 
    res.sendStatus(204); 
});


module.exports = router; 
