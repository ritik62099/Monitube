const express = require('express');
const { addProduct, getProducts,getUserProducts,getAllProducts} = require('../controllers/productController'); // Import your controller
const upload = require('../middleware/uploadMiddleware');
const verifyToken = require('../middleware/auth')

const router = express.Router();

// Route for adding a new product
router.post('/addProduct',verifyToken, upload.single('image'), addProduct);

// Route for fetching all products
router.get('/', getProducts); // This will retrieve all products

router.get('/:serviceType', getAllProducts);

router.get('/userproducts',verifyToken, getUserProducts);

module.exports = router;
