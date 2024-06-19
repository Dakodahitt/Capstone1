import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">MyReviewApp</Link>
        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.username}</span>
              <Link to="/account" className="navbar-link">Account</Link>
              <button onClick={logout} className="navbar-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;