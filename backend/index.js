// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes ');
const cartRoutes = require('./routes/cartRoutes'); // Import routes
const bookingRoutes = require('./routes/bookingRoutes'); // Import the booking routes
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Static folder for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // Product-related routes
app.use('/api/orders', orderRoutes);
app.use('/cart', cartRoutes); // Use cart routes
app.use('/api', bookingRoutes);  // All booking-related routes will be prefixed with /api
app.get('/', (res, req)=>{
      res.send("work");
})

module.exports = app; 