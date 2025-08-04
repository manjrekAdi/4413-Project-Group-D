import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit, onCancel, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    rating: initialData?.rating || 0
  });
  const [errors, setErrors] = useState({});
  const [hoveredRating, setHoveredRating] = useState(0);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Review content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Review content must be at least 10 characters';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Review content must be less than 1000 characters';
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Please select a rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
    
    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const renderStars = () => {
    const stars = [];
    const rating = hoveredRating || formData.rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : 'empty'}`}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-form-container">
      <h3>{isEditing ? 'Edit Review' : 'Write a Review'}</h3>
      
      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-group">
          <label htmlFor="rating">Rating *</label>
          <div className="rating-input">
            {renderStars()}
            <span className="rating-text">
              {formData.rating > 0 ? `${formData.rating} out of 5 stars` : 'Click to rate'}
            </span>
          </div>
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="title">Review Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Summarize your experience"
            maxLength={100}
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
          <span className="char-count">{formData.title.length}/100</span>
        </div>

        <div className="form-group">
          <label htmlFor="content">Review Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="Share your detailed experience with this electric vehicle..."
            rows={6}
            maxLength={1000}
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
          <span className="char-count">{formData.content.length}/1000</span>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm; 