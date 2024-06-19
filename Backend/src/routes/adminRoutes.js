const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  updateUserRole,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/adminController');

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.put('/users/role', protect, admin, updateUserRole);
router.post('/products', protect, admin, addProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;