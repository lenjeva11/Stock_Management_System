const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables from .env file
require('dotenv').config();

// Import route handlers for different parts of the app
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/Users');
const productRoutes = require('./routes/Products');
const stockRoutes = require('./routes/Stock');

const app = express();
app.use(cors());

// Enable JSON body parsing for incoming requests
app.use(express.json());

// Connect to MongoDB using connection string from environment variables
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'));

// Set up API routes with specific URL prefixes
app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/users', userRoutes); // Routes for user management
app.use('/api/products', productRoutes); // Routes for product management
app.use('/api/stock', stockRoutes); // Routes for stock management

// Start the server on port 5000
app.listen(5000, () => console.log("Server is running on port 5000"));
