const multer = require('multer');
const path = require('path');

// Configure multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Specify upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize multer with the defined storage
const upload = multer({ storage });

module.exports = upload;
