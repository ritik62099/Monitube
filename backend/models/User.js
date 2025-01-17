// // models/User.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   verified: { type: Boolean, default: false },
//   otp: { type: String, required: false },
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
// });

// // Pre-save hook to hash passwords
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// userSchema.methods.comparePassword = async function(inputPassword) {
//   return await bcrypt.compare(inputPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  otp: { type: String, required: false },
  otpExpiration: { type: Date, required: false }, // OTP expiration time
  profileImage: { type: String, required: false }, // Store profile image path
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

// Pre-save hook to hash passwords
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Method to check if OTP is expired
userSchema.methods.isOtpExpired = function() {
  return this.otpExpiration < Date.now();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
