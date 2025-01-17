// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   }],
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Order', orderSchema);




const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  paymentId: { type: String, required: true },
  productName: { type: String, required: true },
  amount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);

