// const express = require('express');
// const { createOrder, getOrders } = require('../controllers/orderController');

// const router = express.Router();

// // Routes
// router.post('/', createOrder);
// router.get('/', getOrders);

// module.exports = router;


const express = require('express');
const { saveOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/', saveOrder); // POST request to save an order

module.exports = router;
