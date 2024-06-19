const prisma = require('../services/prisma');

exports.createReview = async (req, res) => {
  const { productId, text, rating } = req.body;
  const { user } = req;

  try {
    const reviewExists = await prisma.review.findFirst({
      where: { userId: user.id, productId },
    });

    if (reviewExists) {
      return res.status(400).json({ message: 'Review already exists' });
    }

    const review = await prisma.review.create({
      data: {
        text,
        rating,
        productId,
        userId: user.id,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review' });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;
  const { user } = req;

  try {
    const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });

    if (review.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { text, rating },
    });

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });

    if (review.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.review.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review' });
  }
};

exports.getUserReviews = async (req, res) => {
  const { user } = req;

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: user.id },
      include: { product: true },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

exports.getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      include: { user: true },
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};