// // /routes/cartRoutes.js
// const express = require('express');
// const { saveCart, removeProductFromCart } = require('../controllers/cartController');

// const router = express.Router();

// // Route to save cart data to MongoDB
// router.post('/', saveCart);

// // Route to remove a product from cart
// router.delete('/:productId', removeProductFromCart);

// module.exports = router;


const express = require('express');
const { saveCart, getCart } = require('../controllers/cartController');
const verifyToken = require('../middleware/auth'); // Import the verify token middleware

const router = express.Router();

// Route to get the user's cart
router.get('/', verifyToken, getCart); // Protect this route using the JWT token verification

// Route to save cart data to MongoDB
router.post('/', verifyToken, saveCart); // Protect this route using the JWT token verification

module.exports = router;
