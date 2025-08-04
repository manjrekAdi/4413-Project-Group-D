import React from 'react';
import './Review.css';

const Review = ({ review, onEdit, onDelete, canEdit, canDelete }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-rating">
          {renderStars(review.rating)}
          <span className="rating-number">({review.rating}/5)</span>
        </div>
        <div className="review-meta">
          <span className="review-author">{review.user?.username || 'Anonymous'}</span>
          <span className="review-date">{formatDate(review.createdAt)}</span>
          {review.verified && <span className="verified-badge">✓ Verified</span>}
        </div>
      </div>
      
      <div className="review-content">
        <h4 className="review-title">{review.title}</h4>
        <p className="review-text">{review.content}</p>
      </div>
      
      {(canEdit || canDelete) && (
        <div className="review-actions">
          {canEdit && (
            <button 
              className="btn btn-edit" 
              onClick={() => onEdit(review)}
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button 
              className="btn btn-delete" 
              onClick={() => onDelete(review.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Review; 