import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const CommentForm = ({ reviewId, fetchReviews }) => {
  const [comment, setComment] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:4000/comments', {
        text: comment,
        reviewId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComment('');
      fetchReviews();
    } catch (error) {
      console.error('Failed to submit comment', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
