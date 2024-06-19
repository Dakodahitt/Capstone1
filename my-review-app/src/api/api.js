import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this points to your backend
});

export const getProducts = () => {
  return api.get('/products')
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching products:', error);
      throw error;
    });
};

export const getProduct = (id) => {
  return api.get(`/products/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    });
};

export const searchProducts = (query) => {
  return api.get('/search', { params: { query } })
    .then(response => response.data)
    .catch(error => {
      console.error('Error searching products:', error);
      throw error;
    });
};

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

export default {
  getProducts,
  getProduct,
  searchProducts,
  registerUser,
  loginUser,
};