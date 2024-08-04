import React from 'react';
import PropTypes from 'prop-types';
import './ReviewCard.css'; 

export default function ReviewCard({ username, rating, remarks }) {
  return (
    <div className="review-card">
      <h3 className="review-card-username">{username}</h3>
      <p className="review-card-rating">Rating: {rating}</p>
      <p className="review-card-remarks">{remarks}</p>
    </div>
  );
}

ReviewCard.propTypes = {
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  remarks: PropTypes.string.isRequired,
};