const express = require('express');
const { getAllBookings, createBooking } = require('../controllers/bookingController');

const router = express.Router();

// Define the routes and map them to controller functions
router.get('/bookings', getAllBookings); // Get all bookings
router.post('/bookings', createBooking); // Create a new booking

// Export the router to use in the main app
module.exports = router;
