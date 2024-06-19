const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById); 
router.get('/search', productController.searchProducts);

module.exports = router;