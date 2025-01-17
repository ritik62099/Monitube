// /models/cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    image: String,
    description: String,
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
