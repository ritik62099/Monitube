


const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const sendOTPEmail = require('../utils/email');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('profileImage');

// Signup
router.post('/signup', upload, async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) return res.status(400).send('User already exists');

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const newUser = new User({ name, email, password, otp });

  // Save profile image path if available
  if (req.file) {
    newUser.profileImage = req.file.path;
  }

  await newUser.save();

  try {
    await sendOTPEmail(email, otp); // Send OTP email
    res.status(200).send('OTP sent to email');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending OTP');
  }
});

// OTP Verification
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send('User not found');
  if (user.otp !== otp) return res.status(400).send('Invalid OTP');

  user.verified = true;
  await user.save();

  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.status(200).json({ message: 'OTP verified successfully', token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verified) return res.status(400).send('User not found or not verified');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send token and user name
  res.json({ token, name: user.name , profileImage: user.profileImage || 'https://via.placeholder.com/150',});
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('User not found');
  
  const otp = Math.floor(100000 + Math.random() * 900000);
  user.otp = otp;
  await user.save();
  
  await sendOTPEmail(email, otp);
  res.send('OTP sent to your email');
});

// Reset Password after OTP Verification
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp) return res.status(400).send('Invalid OTP or email');

  user.password = newPassword;
  user.otp = null; // Clear OTP
  await user.save();

  res.send('Password updated successfully');
});




module.exports = router;
