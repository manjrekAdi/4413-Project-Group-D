package com.evcommerce.backend.service;

import com.evcommerce.backend.model.Review;
import com.evcommerce.backend.model.EV;
import com.evcommerce.backend.model.User;
import com.evcommerce.backend.repository.ReviewRepository;
import com.evcommerce.backend.repository.EVRepository;
import com.evcommerce.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private EVRepository evRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ReviewService reviewService;

    private User testUser;
    private EV testEV;
    private Review testReview;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // Setup test data
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setRole(User.UserRole.CUSTOMER);

        testEV = new EV();
        testEV.setId(1L);
        testEV.setModel("Model 3");
        testEV.setBrand("Tesla");
        testEV.setPrice(new BigDecimal("45000"));
        testEV.setRangeKm(350);
        testEV.setBatteryCapacityKwh(75);
        testEV.setChargingTimeHours(8);

        testReview = new Review();
        testReview.setId(1L);
        testReview.setUser(testUser);
        testReview.setEv(testEV);
        testReview.setTitle("Great EV!");
        testReview.setContent("This is an excellent electric vehicle.");
        testReview.setRating(5);
    }

    @Test
    void testCreateReview() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(evRepository.findById(1L)).thenReturn(Optional.of(testEV));
        when(reviewRepository.findByUserAndEv(testUser, testEV)).thenReturn(Optional.empty());
        when(reviewRepository.save(any(Review.class))).thenReturn(testReview);

        // Act
        Review result = reviewService.createReview(1L, 1L, testReview);

        // Assert
        assertNotNull(result);
        assertEquals(testReview.getTitle(), result.getTitle());
        assertEquals(testReview.getRating(), result.getRating());
        verify(reviewRepository).save(any(Review.class));
    }

    @Test
    void testCreateReview_UserNotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            reviewService.createReview(1L, 1L, testReview);
        });
    }

    @Test
    void testCreateReview_EVNotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(evRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            reviewService.createReview(1L, 1L, testReview);
        });
    }

    @Test
    void testCreateReview_AlreadyReviewed() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(evRepository.findById(1L)).thenReturn(Optional.of(testEV));
        when(reviewRepository.findByUserAndEv(testUser, testEV)).thenReturn(Optional.of(testReview));

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            reviewService.createReview(1L, 1L, testReview);
        });
    }

    @Test
    void testGetReviewsByEv() {
        // Arrange
        List<Review> expectedReviews = Arrays.asList(testReview);
        when(evRepository.findById(1L)).thenReturn(Optional.of(testEV));
        when(reviewRepository.findByEvOrderByCreatedAtDesc(testEV)).thenReturn(expectedReviews);

        // Act
        List<Review> result = reviewService.getReviewsByEv(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testReview, result.get(0));
    }

    @Test
    void testUpdateReview() {
        // Arrange
        Review updatedReview = new Review();
        updatedReview.setTitle("Updated Review");
        updatedReview.setContent("Updated content");
        updatedReview.setRating(4);

        when(reviewRepository.findById(1L)).thenReturn(Optional.of(testReview));
        when(reviewRepository.save(any(Review.class))).thenReturn(updatedReview);

        // Act
        Review result = reviewService.updateReview(1L, 1L, updatedReview);

        // Assert
        assertNotNull(result);
        assertEquals(updatedReview.getTitle(), result.getTitle());
        assertEquals(updatedReview.getRating(), result.getRating());
        verify(reviewRepository).save(any(Review.class));
    }

    @Test
    void testDeleteReview() {
        // Arrange
        when(reviewRepository.findById(1L)).thenReturn(Optional.of(testReview));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        doNothing().when(reviewRepository).delete(testReview);

        // Act
        reviewService.deleteReview(1L, 1L);

        // Assert
        verify(reviewRepository).delete(testReview);
    }
} 