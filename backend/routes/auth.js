const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const router = express.Router();


 //Handles POST requests to /login

router.post('/login', async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Find user by username in the database
  const user = await User.findOne({ username });
  // If user not found or password does not match, return error
  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create a JWT token with user ID as payload, expires in 1 day
  const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1d' });
  // Send the token as JSON response
  res.json({ token });
});


 //Handles POST requests to /signup

router.post('/signup', async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Check if a user with the same username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    // If username exists, return error response
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Create a new user instance with provided username and password
  const newUser = new User({ username, password });
  // Save the new user to the database
  await newUser.save();

  // Create a JWT token for the new user, expires in 1 day
  const token = jwt.sign({ userId: newUser._id }, 'secret', { expiresIn: '1d' });
  // Send the token as JSON response
  res.json({ token });
});


 //Second login route (more secure, uses bcrypt for password hashing)
 //Handles POST requests to /login
 
router.post("/login", async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  try {
    // Find user by username in the database
    const user = await User.findOne({ username });

    // If user not found, return error response
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare provided password with hashed password stored in database
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return error response
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token with user ID as payload
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token as JSON response
    res.json({ token });
  } catch (err) {
    // Log any server errors and return 500 response
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


