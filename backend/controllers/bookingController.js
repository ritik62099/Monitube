const Booking = require('../models/bookingModel');

// Controller function to fetch all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err });
  }
};

// Controller function to create a new booking
const createBooking = async (req, res) => {
  const { name, price, image, bookingDate } = req.body;

  const newBooking = new Booking({ name, price, image, bookingDate });

  try {
    await newBooking.save();
    res.status(201).json({ message: 'Booking added successfully', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Error adding booking', error: err });
  }
};

// Export the functions for use in the routes
module.exports = {
  getAllBookings,
  createBooking,
};
