package com.evcommerce.backend.service;

import com.evcommerce.backend.model.Review;
import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.User;
import com.evcommerce.backend.repository.ReviewRepository;
import com.evcommerce.backend.repository.EVRepository;
import com.evcommerce.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private EVRepository evRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Review> getReviewsByEv(Long evId) {
        EV ev = evRepository.findById(evId)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        return reviewRepository.findByEvOrderByCreatedAtDesc(ev);
    }
    
    public List<Review> getVerifiedReviewsByEv(Long evId) {
        EV ev = evRepository.findById(evId)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        return reviewRepository.findVerifiedReviewsByEv(ev);
    }
    
    public List<Review> getReviewsByUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return reviewRepository.findByUserOrderByCreatedAtDesc(user);
    }
    
    public Review createReview(Long userId, Long evId, Review reviewDetails) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        EV ev = evRepository.findById(evId)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        
        // Check if user already reviewed this EV
        Optional<Review> existingReview = reviewRepository.findByUserAndEv(user, ev);
        if (existingReview.isPresent()) {
            throw new RuntimeException("You have already reviewed this vehicle");
        }
        
        Review review = new Review();
        review.setUser(user);
        review.setEv(ev);
        review.setTitle(reviewDetails.getTitle());
        review.setContent(reviewDetails.getContent());
        review.setRating(reviewDetails.getRating());
        
        return reviewRepository.save(review);
    }
    
    public Review updateReview(Long reviewId, Long userId, Review reviewDetails) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new RuntimeException("Review not found"));
        
        // Check if user owns this review
        if (!review.getUser().getId().equals(userId)) {
            throw new RuntimeException("You can only update your own reviews");
        }
        
        review.setTitle(reviewDetails.getTitle());
        review.setContent(reviewDetails.getContent());
        review.setRating(reviewDetails.getRating());
        
        return reviewRepository.save(review);
    }
    
    public void deleteReview(Long reviewId, Long userId) {
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new RuntimeException("Review not found"));
        
        // Check if user owns this review or is admin
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!review.getUser().getId().equals(userId) && !user.getRole().equals(User.UserRole.ADMIN)) {
            throw new RuntimeException("You can only delete your own reviews");
        }
        
        reviewRepository.delete(review);
    }
    
    public Map<String, Object> getReviewStatsByEv(Long evId) {
        EV ev = evRepository.findById(evId)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        
        Double averageRating = reviewRepository.getAverageRatingByEv(ev);
        Long reviewCount = reviewRepository.getReviewCountByEv(ev);
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("averageRating", averageRating != null ? averageRating : 0.0);
        stats.put("reviewCount", reviewCount != null ? reviewCount : 0L);
        stats.put("ratingDistribution", getRatingDistribution(ev));
        
        return stats;
    }
    
    private Map<Integer, Long> getRatingDistribution(EV ev) {
        Map<Integer, Long> distribution = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            List<Review> reviews = reviewRepository.findByEvAndRating(ev, i);
            distribution.put(i, (long) reviews.size());
        }
        return distribution;
    }
    
    public List<Review> getTopReviews(Integer minRating) {
        return reviewRepository.findReviewsByMinRating(minRating);
    }
    
    public Review verifyReview(Long reviewId, Long adminUserId) {
        User admin = userRepository.findById(adminUserId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!admin.getRole().equals(User.UserRole.ADMIN)) {
            throw new RuntimeException("Only admins can verify reviews");
        }
        
        Review review = reviewRepository.findById(reviewId)
            .orElseThrow(() -> new RuntimeException("Review not found"));
        
        review.setVerified(true);
        return reviewRepository.save(review);
    }
    
    public Optional<Review> getUserReviewForEv(Long userId, Long evId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        EV ev = evRepository.findById(evId)
            .orElseThrow(() -> new RuntimeException("EV not found"));
        
        return reviewRepository.findByUserAndEv(user, ev);
    }
} 