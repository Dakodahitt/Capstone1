import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';
import { AuthContext } from '../context/AuthContext';
import './AuthPage.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });
      setIsLoggedIn(true);
      setUser(response.user);
      navigate('/');
    } catch (error) {
      console.error('Failed to signup', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Create account</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Create your account</button>
        </form>
        <p className="auth-switch">
          Already have an account? <a href="/login">Sign-In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;