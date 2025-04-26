const express = require('express'); // Import express framework
const router = express.Router(); // Create a new router object
const User = require('../models/User'); // Import User model


router.get('/', async (req, res) =>{  // Define GET route to fetch all users
    const users = await User.find(); // Fetch all users from database
    res.json(users); // Send users as JSON response
});


router.post('/', async (req, res) =>{ // Define POST route to create a new user
    const user = new User(req.body); // Create new User instance from request body
    await user.save(); // Save user to database
    res.json(user); // Send saved user as JSON response
});


router.put('/:id', async (req, res) =>{ // Define PUT route to update user by id
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true}); // Update user and return new document
    res.json(updated) // Send updated user as JSON response
});


router.delete('/:id', async (req, res) =>{ // Define DELETE route to delete user by id
    await User.findByIdAndDelete(req.params.id); // Delete user from database
    res.sendStatus(204); // Send 204 No Content status
});


module.exports = router; // Export the router
