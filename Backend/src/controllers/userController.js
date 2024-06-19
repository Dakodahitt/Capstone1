const axios = require('axios');

const FAKE_STORE_API_URL = 'https://fakestoreapi.com';

exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const response = await axios.post(`${FAKE_STORE_API_URL}/users`, {
      email,
      username,
      password,
      name: {
        firstname: 'John',
        lastname: 'Doe'
      },
      address: {
        city: 'kilcoole',
        street: '7835 new road',
        number: 3,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
      phone: '1-570-236-7033'
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await axios.post(`${FAKE_STORE_API_URL}/auth/login`, {
      username,
      password
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
};