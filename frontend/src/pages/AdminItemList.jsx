import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';
import './AdminItemList.css';

const AdminItemList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    picture: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:4000/admin/items', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch items", error);
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post('http://localhost:4000/admin/items', newItem, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems([...items, response.data]);
      setNewItem({
        title: '',
        price: '',
        description: '',
        category: '',
        picture: ''
      });
    } catch (error) {
      console.error("Failed to add item", error);
      setError('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:4000/admin/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item', error);
      setError('Failed to delete item');
    }
  };

  return (
    <div className="container">
      <h1>Admin Item List</h1>
      {error && <p className="error-message">{error}</p>}
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item">
            <span>{item.title}</span>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newItem.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newItem.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newItem.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="picture"
          placeholder="Picture URL"
          value={newItem.picture}
          onChange={handleInputChange}
          required
        />
        <button className='Add-Item' type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AdminItemList;
