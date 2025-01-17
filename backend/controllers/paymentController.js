const Payment = require('../models/Payment');
const Product = require('../models/Product');

const savePayment = async (req, res) => {
  try {
    const { productId, paymentId, amount } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newPayment = new Payment({
      user: req.user._id, // User making the payment
      product: productId,
      paymentId,
      amount,
    });

    await newPayment.save();
    res.status(201).json({ message: 'Payment saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment', error: error.message });
  }
};

module.exports = { savePayment };
