import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', image: '', description: '', category: '' });

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setItems(response.data);
    };
    const fetchUsers = async () => {
      const response = await axios.get('https://fakestoreapi.com/users');
      setUsers(response.data);
    };
    fetchItems();
    fetchUsers();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fakestoreapi.com/products', newItem);
      setItems([...items, response.data]);
      setNewItem({ title: '', image: '', description: '', category: '' });
    } catch (error) {
      console.error('Failed to add item', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;