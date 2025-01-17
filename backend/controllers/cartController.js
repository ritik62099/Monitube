


const jwt = require('jsonwebtoken');
const Cart = require('../models/cartItemModel');

// Middleware to get user from JWT token
const getUserFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // The user ID is in the JWT payload
  } catch (err) {
    throw new Error('Invalid token');
  }
};

// Save cart to MongoDB for a specific user
const saveCart = async (req, res) => {
  const { cart } = req.body;
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, please login first' });
  }

  try {
    const userId = getUserFromToken(token); // Get user from token
    let existingCart = await Cart.findOne({ user: userId });

    if (!existingCart) {
      // If cart doesn't exist, create a new cart
      existingCart = new Cart({ user: userId, products: cart });
    } else {
      // Update the existing cart
      existingCart.products = cart;
    }

    await existingCart.save(); // Save cart to DB
    res.status(200).json({ message: 'Cart saved successfully', cart: existingCart });
  } catch (error) {
    console.error('Error saving cart:', error);
    res.status(500).json({ message: 'Error saving cart' });
  }
};

// Get the cart of the currently logged-in user
const getCart = async (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, please login first' });
  }

  try {
    const userId = getUserFromToken(token); // Get user from token
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'No cart found for this user' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart' });
  }
};

module.exports = { saveCart, getCart };
