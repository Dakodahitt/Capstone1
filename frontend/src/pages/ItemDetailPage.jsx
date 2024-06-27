import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from '../services/auth';
import './ItemDetailPage.css';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: '', rating: 0 });
  const [newComment, setNewComment] = useState({ text: '', reviewId: null });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showCommentForms, setShowCommentForms] = useState({});
  const [editingReview, setEditingReview] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showComments, setShowComments] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItemAndReviews = async () => {
      try {
        const itemResponse = await axios.get(`https://capstone-11.onrender.com/items/${id}`);
        setItem(itemResponse.data);
        const reviewsResponse = await axios.get(`https://capstone-11.onrender.com/items/${id}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Failed to fetch item and reviews', error);
        setError('Failed to fetch item and reviews');
      }
    };

    fetchItemAndReviews();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post(`https://capstone-11.onrender.com/items/${id}/reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews([...reviews, response.data]);
      setNewReview({ text: '', rating: 0 });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to submit review', error);
      setError('Failed to submit review');
    }
  };

  const handleCommentChange = (e, reviewId) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value, reviewId });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.post(`https://capstone-11.onrender.com/reviews/${newComment.reviewId}/comments`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedReviews = reviews.map(review => {
        if (review.id === newComment.reviewId) {
          return { ...review, comments: review.comments ? [...review.comments, response.data] : [response.data] };
        }
        return review;
      });
      setReviews(updatedReviews);
      setNewComment({ text: '', reviewId: null });
      setShowCommentForms(prev => ({ ...prev, [newComment.reviewId]: false }));
    } catch (error) {
      console.error('Failed to submit comment', error);
      setError('Failed to submit comment');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = getToken();
      await axios.delete(`https://capstone-11.onrender.com/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Failed to delete review', error);
      setError('Failed to delete review');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setNewReview({ text: review.text, rating: review.rating });
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const response = await axios.put(`https://capstone-11.onrender.com/reviews/${editingReview.id}`, newReview, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedReviews = reviews.map(review => review.id === editingReview.id ? response.data : review);
      setReviews(updatedReviews);
      setEditingReview(null);
      setNewReview({ text: '', rating: 0 });
    } catch (error) {
      console.error('Failed to update review', error);
      setError('Failed to update review');
    }
  };

  return (
    <div className="item-detail-container">
      {error && <p className="error">{error}</p>}
      {item && (
        <>
          <div className="item-detail">
            <div className="item-image-container">
              <img className="item-image" src={item.picture} alt={item.title} />
            </div>
            <div className="item-info">
              <h1 className="item-title">{item.title}</h1>
              <p className="item-description">{item.description}</p>
              <p className="item-price">Price: ${item.price}</p>
              <p className="item-category">Category: {item.category}</p>
              <p className="item-rating">Rating: {item.rating ? item.rating.rate : 'No rating available'}</p>
            </div>
          </div>
          <div className="reviews-section">
            <button className="review-toggle-btn" onClick={() => setShowReviews(!showReviews)}>
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
            {showReviews && (
              <>
                <h2>Reviews</h2>
                {reviews.map(review => (
                  <div key={review.id} className="review">
                    <p className="review-text">{review.text}</p>
                    <p className="review-rating">Rating: {review.rating}</p>
                    <button className="comment-toggle-btn" onClick={() => setShowComments(prev => ({ ...prev, [review.id]: !prev[review.id] }))}>
                      {showComments[review.id] ? "Hide Comments" : "Show Comments"}
                    </button>
                    {showComments[review.id] && (
                      <>
                        <h3>Comments</h3>
                        {review.comments && review.comments.map(comment => (
                          <p key={comment.id} className="comment-text">{comment.text}</p>
                        ))}
                        <div className="form-dropdown form-visible">
                          <form onSubmit={(e) => handleCommentSubmit(e)}>
                            <textarea
                              name="text"
                              value={newComment.text}
                              onChange={(e) => handleCommentChange(e, review.id)}
                              placeholder="Write a comment..."
                              required
                            />
                            <button type="submit">Submit Comment</button>
                          </form>
                        </div>
                      </>
                    )}
                    <button className="delete-review-btn" onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
                    <button className="edit-review-btn" onClick={() => handleEditReview(review)}>Edit Review</button>
                  </div>
                ))}
                {editingReview ? (
                  <>
                    <h2>Edit Review</h2>
                    <form onSubmit={handleUpdateReview}>
                      <textarea
                        name="text"
                        value={newReview.text}
                        onChange={handleReviewChange}
                        placeholder="Edit your review..."
                        required
                      />
                      <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleReviewChange}
                        placeholder="Rating"
                        min="1"
                        max="5"
                        required
                      />
                      <button type="submit">Update Review</button>
                      <button onClick={() => setEditingReview(null)}>Cancel</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h2>Write a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                      <textarea
                        name="text"
                        value={newReview.text}
                        onChange={handleReviewChange}
                        placeholder="Write a review..."
                        required
                      />
                      <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleReviewChange}
                        placeholder="Rating"
                        min="1"
                        max="5"
                        required
                      />
                      <button className='sub' type="submit">Submit Review</button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetailPage;
