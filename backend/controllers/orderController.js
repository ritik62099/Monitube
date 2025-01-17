



const Order = require('../models/Order'); // Assuming you have an Order model

// Save Order after payment
const saveOrder = async (req, res) => {
  try {
    const { productId, paymentId, productName, amount } = req.body;

    const newOrder = new Order({
      productId,
      paymentId,
      productName,
      amount,
      orderDate: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save order', error: error.message });
  }
};

module.exports = { saveOrder };
