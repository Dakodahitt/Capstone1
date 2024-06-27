import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const ReviewList = ({ reviews, fetchReviews }) => {
  const [editingReview, setEditingReview] = useState(null);

  const handleDelete = async (reviewId) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:4000/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReviews();
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.put(`http://localhost:4000/reviews/${editingReview.id}`, {
        text: editingReview.text,
        rating: editingReview.rating,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error('Failed to update review', error);
    }
  };

  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}>
          {editingReview && editingReview.id === review.id ? (
            <form onSubmit={handleUpdate}>
              <textarea
                value={editingReview.text}
                onChange={(e) => setEditingReview({ ...editingReview, text: e.target.value })}
              ></textarea>
              <input
                type="number"
                value={editingReview.rating}
                onChange={(e) => setEditingReview({ ...editingReview, rating: Number(e.target.value) })}
              />
              <button type="submit">Update</button>
            </form>
          ) : (
            <div>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
              <p>By: {review.user.name}</p>
              <button onClick={() => handleEdit(review)}>Edit</button>
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;