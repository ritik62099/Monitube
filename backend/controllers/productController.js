

const Product = require('../models/Product');

// Add Product with Image


// const addProduct = async (req, res) => {
//   const { name, price, description } = req.body;
//     const userId = req.user.id; // Assuming user ID is stored in the JWT token
//     const image = req.file.path; // Get the image path

//     if (!name || !price || !description || !userId || !image) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     const newProduct = new Product({
//         name,
//         price,
//         description,
//         user: userId,
//         image,
//     });

//     try {
//         const savedProduct = await newProduct.save();
//         res.status(201).json({ message: 'Product added successfully', product: savedProduct });
//     } catch (error) {
//         console.error('Error adding product:', error);
//         res.status(500).json({ error: 'Failed to add product' });
//     }
// };

// const addProduct = async (req, res) => {
//   const { name, price, description, service } = req.body;
//   const userId = req.user.id;  // Get the user ID from the JWT token
//   const image = req.file ? req.file.path : '';  // Get the image path from Multer

//   if (!name || !price || !description || !userId || !image || !service) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const newProduct = new Product({
//     name,
//     price,
//     description,
//     user: userId,
//     image,
//     service, // Add the service field
//   });

//   try {
//     const savedProduct = await newProduct.save();  // Save the product in the database
//     res.status(201).json({ message: 'Product added successfully', product: savedProduct });
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).json({ error: 'Failed to add product' });
//   }
// };

const addProduct = async (req, res) => {
  const { name, price, description, service } = req.body;
  const userId = req.user.id; // Get the user ID from the JWT token

  // Check for required fields
  if (!name || !price || !description || !userId || !service) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Generate image URL if file is uploaded
  const imageUrl = req.file
    ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    : '';

  // Validate image field
  if (!imageUrl) {
    return res.status(400).json({ error: 'Image is required' });
  }

  // Create a new product instance
  const newProduct = new Product({
    name,
    price,
    description,
    user: userId,
    image: imageUrl,
    service, // Add the service field
  });

  try {
    const savedProduct = await newProduct.save(); // Save the product in the database
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};



// Get all products list
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products from the database
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
  }
};

// get userproduct 
// const getUserProducts = async (req, res) => {
//   try {
//     const products = await Product.find({ user: req.user.id }).populate('user', 'username'); // Populate user info
//     res.send(products);
//   } catch (error) {
//     res.status(500).send({ message: 'Error fetching products', error });
//   }
// };

const getUserProducts = async (req, res) => {
  console.log('Route Hit: /api/products/userproducts');
  console.log('User ID:', req.user.id); // Log user ID

  try {
    const products = await Product.find({ user: req.user.id }).populate('user', 'username');
    console.log('Fetched Products:', products);

    if (!products || products.length === 0) {
      return res.status(404).send({ message: 'No products found for this user.' });
    }

    res.send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Error fetching products', error });
  }
};



const getAllProducts = async (req, res) => {
  const { serviceType } = req.params;

  try {
      const products = await Product.find({ service: serviceType });
      if (!products.length) {
          return res.status(404).json({ message: 'No products found for this service type' });
      }
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { addProduct, getProducts, getUserProducts,getAllProducts }; // Export both functions

