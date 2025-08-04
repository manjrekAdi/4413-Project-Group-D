package com.evcommerce.backend.controller;

import com.evcommerce.backend.model.Review;
import com.evcommerce.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"http://localhost:3000", "https://four413-project-group-d-7.onrender.com", "https://ev-frontend.onrender.com", "https://four413-project-group-d-6.onrender.com"})
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @GetMapping("/ev/{evId}")
    public ResponseEntity<List<Review>> getReviewsByEv(@PathVariable Long evId) {
        try {
            List<Review> reviews = reviewService.getReviewsByEv(evId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/ev/{evId}/verified")
    public ResponseEntity<List<Review>> getVerifiedReviewsByEv(@PathVariable Long evId) {
        try {
            List<Review> reviews = reviewService.getVerifiedReviewsByEv(evId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Review>> getReviewsByUser(@PathVariable Long userId) {
        try {
            List<Review> reviews = reviewService.getReviewsByUser(userId);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/ev/{evId}")
    public ResponseEntity<?> createReview(
            @PathVariable Long evId,
            @RequestParam Long userId,
            @Valid @RequestBody Review review) {
        try {
            Review createdReview = reviewService.createReview(userId, evId, review);
            return ResponseEntity.ok(createdReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{reviewId}")
    public ResponseEntity<?> updateReview(
            @PathVariable Long reviewId,
            @RequestParam Long userId,
            @Valid @RequestBody Review reviewDetails) {
        try {
            Review updatedReview = reviewService.updateReview(reviewId, userId, reviewDetails);
            return ResponseEntity.ok(updatedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long reviewId,
            @RequestParam Long userId) {
        try {
            reviewService.deleteReview(reviewId, userId);
            return ResponseEntity.ok(Map.of("message", "Review deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/ev/{evId}/stats")
    public ResponseEntity<Map<String, Object>> getReviewStatsByEv(@PathVariable Long evId) {
        try {
            Map<String, Object> stats = reviewService.getReviewStatsByEv(evId);
            return ResponseEntity.ok(stats);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/top")
    public ResponseEntity<List<Review>> getTopReviews(@RequestParam(defaultValue = "4") Integer minRating) {
        try {
            List<Review> reviews = reviewService.getTopReviews(minRating);
            return ResponseEntity.ok(reviews);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{reviewId}/verify")
    public ResponseEntity<?> verifyReview(
            @PathVariable Long reviewId,
            @RequestParam Long adminUserId) {
        try {
            Review verifiedReview = reviewService.verifyReview(reviewId, adminUserId);
            return ResponseEntity.ok(verifiedReview);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/user/{userId}/ev/{evId}")
    public ResponseEntity<Review> getUserReviewForEv(
            @PathVariable Long userId,
            @PathVariable Long evId) {
        try {
            Optional<Review> review = reviewService.getUserReviewForEv(userId, evId);
            return review.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
} 