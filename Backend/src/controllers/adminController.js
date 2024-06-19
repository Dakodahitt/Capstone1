const prisma = require('../services/prisma');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

exports.updateUserRole = async (req, res) => {
  const { id, role } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user role' });
  }
};

exports.addProduct = async (req, res) => {
  const { title, description, image, category } = req.body;

  try {
    const product = await prisma.product.create({
      data: { title, description, image, category },
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, category } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { title, description, image, category },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};