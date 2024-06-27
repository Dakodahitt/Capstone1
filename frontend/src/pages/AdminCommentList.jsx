import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:4000/admin/comments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
        setError('Failed to fetch comments');
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:4000/admin/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(comments.filter(comment => comment.id !== id));
    } catch (error) {
      console.error("Failed to delete comment", error);
      setError('Failed to delete comment');
    }
  };

  return (
    <div className="container">
      <h1>Admin Comments</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <h3>Item: {comment.review.item.title}</h3>
            <h4>User: {comment.user.name}</h4>
            <p>Review: {comment.review.text}</p>
            <p>Comment: {comment.text}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminComments;
