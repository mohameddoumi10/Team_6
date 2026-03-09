const express = require('express');
const { createProduct, getAllProducts, getProductById } = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware'); // Assuming auth middleware exists

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (business only)
// router.post('/', auth, createProduct); 

module.exports = router;
