import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserRole } from '../api/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole({ userId, role: newRole });
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.role}
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;