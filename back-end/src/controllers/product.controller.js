const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    
    // Assuming vendor is the logged in user (business)
    const vendorId = req.user.id; 

    const product = await Product.create({
      name,
      description,
      price,
      category,
      vendor: vendorId,
      stock,
      images
    });

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').populate('vendor', 'full_name');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name').populate('vendor', 'full_name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById
};
