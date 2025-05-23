

// // models/Product.js
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a User model
//     image: { type: String, required: true }, // Store the image URL or path
// }, { timestamps: true });

// const Product = mongoose.model('Product', productSchema);
// module.exports = Product;

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    image: { type: String, required: true }, // Path to the uploaded image
    service: { type: String, required: true, enum: ['channel','content','script','seo','thumbnail','analytics','advertiser','videoediting'] }, // service type
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt timestamps
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

