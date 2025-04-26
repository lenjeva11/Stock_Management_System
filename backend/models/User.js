const mongoose = require('mongoose'); // Import mongoose library for MongoDB object modeling

// Define a new schema for User collection
const userSchema = new mongoose.Schema({
    username: String, // Username field of type String
    password: String  // Password field of type String
});

// Export the User model based on userSchema
module.exports = mongoose.model('User', userSchema);
