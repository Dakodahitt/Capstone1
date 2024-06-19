const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  getProductReviews,
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.get('/user', protect, getUserReviews);
router.get('/product/:productId', getProductReviews);

module.exports = router;