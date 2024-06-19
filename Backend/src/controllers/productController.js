const axios = require('axios');

const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

exports.getProducts = async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API_URL}/products`);
    const products = response.data;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${FAKE_STORE_API_URL}/products/${id}`);
    const product = response.data;
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
};

exports.searchProducts = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`${FAKE_STORE_API_URL}/products`);
    const products = response.data;
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search products' });
  }
};