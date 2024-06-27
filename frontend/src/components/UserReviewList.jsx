import React from 'react';

const UserReviewList = ({ reviews }) => {
  return (
    <div>
      <h2>User Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Item: {review.item.title}</p>
            <p>Rating: {review.rating}</p>
            <p>Review: {review.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviewList;