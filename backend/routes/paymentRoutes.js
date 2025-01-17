const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { savePayment } = require('../controllers/paymentController');

router.post('/', protect, savePayment);

module.exports = router;
