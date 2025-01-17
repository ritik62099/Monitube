const crypto = require('crypto');
const { sendOtpEmail } = require('../utils/email');

let otpStore = {}; // Temporary OTP storage. In production, use Redis or a database.

// Generate a random OTP and store it temporarily
const generateOtp = (email) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  otpStore[email] = { otp, expires: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 minutes

  return otp;
};

// Send OTP to the user's email
const sendOtp = (email) => {
  const otp = generateOtp(email);
  
  // Send OTP via email
  sendOtpEmail(email, otp)
    .then(() => {
      console.log(`OTP sent to ${email}: ${otp}`);
    })
    .catch((error) => {
      console.error(`Failed to send OTP to ${email}:`, error);
    });
};

// Verify OTP for a given email
const verifyOtp = (email, otp) => {
  const data = otpStore[email];

  // If no OTP exists for the email or OTP is invalid
  if (!data) return { success: false, message: 'OTP not found.' };
  if (data.otp !== otp) return { success: false, message: 'Invalid OTP.' };

  // Check if the OTP has expired
  if (Date.now() > data.expires) {
    delete otpStore[email]; // Remove expired OTP
    return { success: false, message: 'OTP expired.' };
  }

  // OTP is valid, remove it from the store after verification
  delete otpStore[email];
  return { success: true, message: 'OTP verified successfully.' };
};

module.exports = { sendOtp, verifyOtp };
