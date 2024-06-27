import { useState, useContext } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';
import { AuthContext } from '../context/AuthContext';

const ReviewForm = ({ itemId, fetchReviews }) => {
  const [review, setReview] = useState({ text: '', rating: 0 });
  const { isLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:4000/reviews', {
        text: review.text,
        rating: review.rating,
        productId: parseInt(itemId),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReview({ text: '', rating: 0 });
      fetchReviews();
    } catch (error) {
      console.error('Failed to submit review', error);
    }
  };

  return (
    isLoggedIn && (
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your review"
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
        ></textarea>
        <input
          type="number"
          placeholder="Rating"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
        />
        <button type="submit">Submit Review</button>
      </form>
    )
  );
};

export default ReviewForm;
