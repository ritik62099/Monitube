// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];  // 'Bearer <token>' format hota hai

//   if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;  // Token se user ko request mein attach kar rahe hain
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = verifyToken;


const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully:', verified);
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired:', err);
      return res.status(401).json({ message: 'Token expired, please login again' });
    } else if (err.name === 'JsonWebTokenError') {
      console.error('Invalid token:', err);
      return res.status(403).json({ message: 'Invalid token' });
    } else {
      console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};

module.exports = verifyToken;


// const jwt = require('jsonwebtoken');

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer header

//   // If no token is provided, return an error
//   if (!token) {
//     console.log('No token provided');
//     return res.status(401).json({ message: 'Access denied, no token provided' });
//   }

//   try {
//     // Verify the token using JWT secret
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Token verified successfully:', verified);

//     // Attach the user data from the token to the request object
//     req.user = verified;
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     // Handle token errors with appropriate status codes
//     if (err.name === 'TokenExpiredError') {
//       console.error('Token expired:', err);
//       return res.status(401).json({ message: 'Token expired, please login again' });
//     }

//     if (err.name === 'JsonWebTokenError') {
//       console.error('Invalid token:', err);
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     console.error('Token verification failed:', err);
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = verifyToken;
