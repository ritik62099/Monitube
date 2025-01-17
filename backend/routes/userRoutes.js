const express = require('express');
const { signup, login, forgotPassword, verifyOTP, resetPassword } = require('../controllers/userController');

const router = express.Router();

// Routes for user authentication
router.post('/signup', signup);  // Signup
router.post('/login', login);    // Login

// Forgot password flow
router.post('/forgot-password', forgotPassword);  // Request OTP for password reset
router.post('/verify-otp', verifyOTP);            // Verify OTP for password reset
router.post('/reset-password', resetPassword);    // Reset password using verified OTP

module.exports = router;
