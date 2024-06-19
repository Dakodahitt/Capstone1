import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ReviewForm = ({ productId, onSubmit }) => {
  const { user } = useAuth();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      onSubmit({ productId, review, rating });
    } else {
      console.error('You must be logged in to submit a review.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Review:</label>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      </div>
      <div>
        <label>Rating:</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;