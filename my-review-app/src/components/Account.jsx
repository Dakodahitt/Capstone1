import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Account.css';

const Account = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="account-container">
      <h1>Account Information</h1>
      <div className="account-info">
        <div>
          <label>Username:</label>
          <input type="text" value={username} readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;