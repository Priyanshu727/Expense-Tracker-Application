// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure this path is correct
const router = express.Router();

// Registration route
router.post('/register', registerUser); // Ensure registerUser is defined

// Login route
router.post('/login', loginUser); // Ensure loginUser is defined

module.exports = router;
