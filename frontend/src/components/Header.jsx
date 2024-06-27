import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {user && user.role === 'admin' && (
              <div className="dropdown">
                <button onClick={toggleDropdown} className="nav-link dropdown-toggle">
                  Admin Tools
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/admin/items" className="nav-link">Admin Items</Link>
                    <Link to="/admin/users" className="nav-link">Admin Users</Link>
                    <Link to="/admin/reviews" className="nav-link">Admin Reviews</Link>
                    <Link to="/admin/comments" className="nav-link">Admin Comments</Link>
                  </div>
                )}
              </div>
            )}
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
