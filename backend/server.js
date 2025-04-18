const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/Users');
const productRoutes = require('./routes/Products');
const stockRoutes = require('./routes/Stock');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stock', stockRoutes);

app.listen(5000, () => console.log("Server is running on port 5000"));