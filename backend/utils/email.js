// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP Code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTPEmail;
