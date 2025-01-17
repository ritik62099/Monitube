// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../middleware/auth');
// const { generateOTP, verifyOTPService } = require('../services/otpService');
// const { sendEmail } = require('../utils/email');

const User = require('../models/User');
// Signup new user
const signup = (req, res) => {
    //   console.log(req.body)
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });

    user.save().then(() => {
        console.log('data save');
        res.send('sucess')
    }).catch((err) => {
        console.log('not save')
        console.error(err)
    })

};

const login = async (req, res) => {
    res.send('work')
    const {email , password} = req.body
     User.findOne({email}).then((result)=>{
        console.log('work');
        console.log(result);

        if(result.password !== req.body.password){
            console.log('wrong password')
        }else{
            console.log('work done')
            // res.send(
            //     {
            //         code :200,
            //         massage :'user found', 
            //         token : 'hefnnf'
            //     }
            // )
        }
     }).catch((err)=>{
        console.log(err);
     })
    

}

// // Login user
// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id), // Generate JWT on successful login
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Forgot password: Send OTP to user's email
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate OTP and save it to the user document
//     const otp = generateOTP();
//     user.otp = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
//     await user.save();

//     // Send OTP via email
//     await sendEmail({
//       to: user.email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP for password reset is: ${otp}`,
//     });

//     res.status(200).json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending OTP', error });
//   }
// };

// // Verify OTP
// const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.otp) {
//       return res.status(404).json({ message: 'User or OTP not found' });
//     }

//     // Verify OTP
//     const isValid = verifyOTPService(otp, user.otp);
//     if (!isValid || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // OTP is valid, allow user to reset the password
//     user.isOTPVerified = true;
//     await user.save();

//     res.status(200).json({ message: 'OTP verified. You can reset your password now.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error verifying OTP', error });
//   }
// };

// // Reset password
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.isOTPVerified) {
//       return res.status(400).json({ message: 'Invalid OTP or OTP not verified' });
//     }

//     // Hash new password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     // Clear OTP and verification status
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     user.isOTPVerified = undefined;

//     await user.save();
//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error resetting password', error });
//   }
// };

module.exports = { signup, login };
