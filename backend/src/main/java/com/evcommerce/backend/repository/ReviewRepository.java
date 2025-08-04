package com.evcommerce.backend.repository;

import com.evcommerce.backend.model.Review;
import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByEvOrderByCreatedAtDesc(EV ev);
    
    List<Review> findByUserOrderByCreatedAtDesc(User user);
    
    Optional<Review> findByUserAndEv(User user, EV ev);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.ev = :ev")
    Double getAverageRatingByEv(@Param("ev") EV ev);
    
    @Query("SELECT COUNT(r) FROM Review r WHERE r.ev = :ev")
    Long getReviewCountByEv(@Param("ev") EV ev);
    
    @Query("SELECT r FROM Review r WHERE r.ev = :ev AND r.rating = :rating")
    List<Review> findByEvAndRating(@Param("ev") EV ev, @Param("rating") Integer rating);
    
    @Query("SELECT r FROM Review r WHERE r.ev = :ev AND r.verified = true ORDER BY r.createdAt DESC")
    List<Review> findVerifiedReviewsByEv(@Param("ev") EV ev);
    
    @Query("SELECT r FROM Review r WHERE r.rating >= :minRating ORDER BY r.createdAt DESC")
    List<Review> findReviewsByMinRating(@Param("minRating") Integer minRating);
    
    @Query("SELECT r FROM Review r WHERE r.ev = :ev ORDER BY r.rating DESC, r.createdAt DESC")
    List<Review> findByEvOrderByRatingDesc(EV ev);
} 