const prisma = require('../services/prisma');

exports.createComment = async (req, res) => {
  const { reviewId, text } = req.body;
  const { user } = req;

  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        reviewId,
        userId: user.id,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment' });
  }
};

exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = req;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });

    if (comment.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { text },
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } });

    if (comment.userId !== user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.comment.delete({ where: { id: parseInt(id) } });

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

exports.getCommentsByReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { reviewId: parseInt(reviewId) },
      include: { user: true },
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};