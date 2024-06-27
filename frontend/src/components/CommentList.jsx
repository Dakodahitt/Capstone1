import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../services/auth';

const CommentList = ({ comments, fetchReviews }) => {
  const [editingComment, setEditingComment] = useState(null);

  const handleDelete = async (commentId) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:4000/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchReviews();
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      await axios.put(`http://localhost:4000/comments/${editingComment.id}`, {
        text: editingComment.text,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingComment(null);
      fetchReviews();
    } catch (error) {
      console.error('Failed to update comment', error);
    }
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          {editingComment && editingComment.id === comment.id ? (
            <form onSubmit={handleUpdate}>
              <textarea
                value={editingComment.text}
                onChange={(e) => setEditingComment({ ...editingComment, text: e.target.value })}
              ></textarea>
              <button type="submit">Update</button>
            </form>
          ) : (
            <div>
              <p>{comment.text}</p>
              {comment.user && comment.user.name && (
              <p>By: {comment.user.name}</p>
              )}
              <button onClick={() => handleEdit(comment)}>Edit</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
