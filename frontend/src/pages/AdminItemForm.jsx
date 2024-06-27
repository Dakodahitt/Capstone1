import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const AdminItemForm = ({ fetchItems, item }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setCategory(item.category);
      setPicture(item.picture);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (item) {
      await axios.put(`https://capstone-11.onrender.com/admin/items/${item.id}`, {
        title, category, picture,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post('https://capstone-11.onrender.com/admin/items', {
        title, category, picture,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    fetchItems();
    setTitle('');
    setCategory('');
    setPicture('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Picture URL"
        value={picture}
        onChange={(e) => setPicture(e.target.value)}
        required
      />
      <button type="submit">{item ? 'Update' : 'Add'} Item</button>
    </form>
  );
};

export default AdminItemForm;