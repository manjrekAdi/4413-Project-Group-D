import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';
import ReviewForm from './ReviewForm';
import './ReviewSection.css';

const ReviewSection = ({ evId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
    fetchReviewStats();
    if (currentUser) {
      fetchUserReview();
    }
  }, [evId, currentUser]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/ev/${evId}`);
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load reviews');
      setLoading(false);
    }
  };

  const fetchReviewStats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/ev/${evId}/stats`);
      setReviewStats(response.data);
    } catch (err) {
      console.error('Failed to load review stats:', err);
    }
  };

  const fetchUserReview = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reviews/user/${currentUser.id}/ev/${evId}`);
      if (response.status === 200) {
        setUserReview(response.data);
      }
    } catch (err) {
      // User hasn't reviewed this EV yet
      setUserReview(null);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      if (editingReview) {
        // Update existing review
        await axios.put(`http://localhost:8080/api/reviews/${editingReview.id}?userId=${currentUser.id}`, reviewData);
      } else {
        // Create new review
        await axios.post(`http://localhost:8080/api/reviews/ev/${evId}?userId=${currentUser.id}`, reviewData);
      }
      
      // Refresh reviews and stats
      await fetchReviews();
      await fetchReviewStats();
      await fetchUserReview();
      
      setShowReviewForm(false);
      setEditingReview(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review');
    }
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:8080/api/reviews/${reviewId}?userId=${currentUser.id}`);
        
        // Refresh reviews and stats
        await fetchReviews();
        await fetchReviewStats();
        await fetchUserReview();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete review');
      }
    }
  };

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

  const renderRatingDistribution = () => {
    if (!reviewStats?.ratingDistribution) return null;

    const totalReviews = Object.values(reviewStats.ratingDistribution).reduce((sum, count) => sum + count, 0);
    
    return (
      <div className="rating-distribution">
        <h4>Rating Distribution</h4>
        {[5, 4, 3, 2, 1].map(rating => {
          const count = reviewStats.ratingDistribution[rating] || 0;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          
          return (
            <div key={rating} className="rating-bar">
              <span className="rating-label">{rating} ★</span>
              <div className="rating-progress">
                <div 
                  className="rating-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="rating-count">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="review-section">
      <div className="review-header">
        <h2>Customer Reviews</h2>
        {currentUser && !userReview && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowReviewForm(true)}
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Statistics */}
      {reviewStats && (
        <div className="review-stats">
          <div className="overall-rating">
            <div className="average-rating">
              <span className="rating-number">{reviewStats.averageRating.toFixed(1)}</span>
              <div className="stars">
                {renderStars(Math.round(reviewStats.averageRating))}
              </div>
            </div>
            <div className="rating-info">
              <p>Based on {reviewStats.reviewCount} reviews</p>
            </div>
          </div>
          {renderRatingDistribution()}
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          onSubmit={handleSubmitReview}
          onCancel={() => {
            setShowReviewForm(false);
            setEditingReview(null);
          }}
          initialData={editingReview}
          isEditing={!!editingReview}
        />
      )}

      {/* User's Review */}
      {userReview && !showReviewForm && (
        <div className="user-review">
          <h3>Your Review</h3>
          <Review
            review={userReview}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
            canEdit={true}
            canDelete={true}
          />
        </div>
      )}

      {/* All Reviews */}
      <div className="reviews-list">
        <h3>All Reviews ({reviews.length})</h3>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <Review
              key={review.id}
              review={review}
              onEdit={currentUser && review.user?.id === currentUser.id ? handleEditReview : null}
              onDelete={currentUser && (review.user?.id === currentUser.id || currentUser.role === 'ADMIN') ? handleDeleteReview : null}
              canEdit={currentUser && review.user?.id === currentUser.id}
              canDelete={currentUser && (review.user?.id === currentUser.id || currentUser.role === 'ADMIN')}
            />
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review this vehicle!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection; 