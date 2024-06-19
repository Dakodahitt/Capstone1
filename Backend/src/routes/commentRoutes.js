const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByReview,
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', protect, createComment);
router.put('/:id', protect, updateComment);
