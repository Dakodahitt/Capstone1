import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUserList.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://capstone-11.onrender.com/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`https://capstone-11.onrender.com/admin/users/${id}/role`, { role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchUsers(); // Refresh the user list after updating role
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  const handleRoleChange = (id, event) => {
    updateUserRole(id, event.target.value);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://capstone-11.onrender.com/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchUsers(); // Refresh the user list after deleting user
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div className="container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="dropdown">
                    <button className="dropbtn">
                      {user.role} <span className="arrow">&#9660;</span>
                    </button>
                    <div className="dropdown-content">
                      <a href="#user" onClick={() => handleRoleChange(user.id, { target: { value: 'user' } })}>User</a>
                      <a href="#admin" onClick={() => handleRoleChange(user.id, { target: { value: 'admin' } })}>Admin</a>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="action-button" onClick={() => deleteUser(user.id)}>Delete User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserList;
