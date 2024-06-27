import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';
import './AdminReviewList.css';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://capstone-11.onrender.com/admin/reviews', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setError('Failed to fetch reviews');
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`https://capstone-11.onrender.com/admin/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error("Failed to delete review", error);
      setError('Failed to delete review');
    }
  };

  return (
    <div className="container">
      <h1>Admin Reviews</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Item: {review.item.title}</h3>
            <h4>User: {review.user.name}</h4>
            <p>Review: {review.text}</p>
            <p>Rating: {review.rating}</p>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReviews;
