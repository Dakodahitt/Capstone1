import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';
import './Dashboard.css';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviewsAndComments = async () => {
      try {
        const token = getToken();
        const [reviewsResponse, commentsResponse] = await Promise.all([
          axios.get('http://localhost:4000/reviews', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:4000/comments', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setReviews(reviewsResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Failed to fetch user reviews and comments', error);
        setError('Failed to fetch user reviews and comments');
      }
    };

    fetchReviewsAndComments();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="reviews-section">
        <h2>Your Reviews</h2>
        <ul className="reviews-list">
          {reviews.map(review => (
            <li key={review.id} className="review-item">
              <h3>{review.item.title}</h3>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
              
            </li>
          ))}
        </ul>
      </div>
      <div className="comments-section">
        <h2>Your Comments</h2>
        <ul className="comments-list">
          {comments.map(comment => (
            <li key={comment.id} className="comment-item">
              <h3>{comment.review.item.title}</h3>
              <p>{comment.text}</p>
             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
