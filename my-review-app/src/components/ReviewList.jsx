import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { deleteReview, updateReview } from '../api/api';

const ReviewList = ({ reviews, setReviews }) => {
  const { user } = useAuth();
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const handleEditReview = async (id) => {
    try {
      const updatedReview = { text: editedText, rating: editedRating };
      await updateReview(id, updatedReview);
      setReviews((prevReviews) =>
        prevReviews.map((review) => (review.id === id ? { ...review, ...updatedReview } : review))
      );
      setEditingReviewId(null);
    } catch (error) {
      console.error('Failed to update review', error);
    }
  };

  const startEditing = (review) => {
    setEditingReviewId(review.id);
    setEditedText(review.text);
    setEditedRating(review.rating);
  };

  const cancelEditing = () => {
    setEditingReviewId(null);
    setEditedText('');
    setEditedRating(0);
  };

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <div>No reviews yet.</div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review">
            {editingReviewId === review.id ? (
              <div>
                <textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <input
                  type="number"
                  value={editedRating}
                  onChange={(e) => setEditedRating(e.target.value)}
                  max={5}
                  min={1}
                />
                <button onClick={() => handleEditReview(review.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{review.text}</p>
                <p>Rating: {review.rating}</p>
                {user && user.id === review.userId && (
                  <div>
                    <button onClick={() => startEditing(review)}>Edit</button>
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;