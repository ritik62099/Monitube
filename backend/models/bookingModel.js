const mongoose = require('mongoose');

// Define the schema for the booking
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
