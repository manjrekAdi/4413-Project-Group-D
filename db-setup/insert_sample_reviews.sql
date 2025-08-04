-- Insert sample reviews for electric vehicles
-- Run this script after creating the database and inserting sample EVs and users

-- Sample reviews for Tesla Model 3
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 1, 'Excellent Performance and Range', 'The Tesla Model 3 exceeded my expectations. The acceleration is incredible and the range is perfect for my daily commute. The autopilot feature is a game-changer for highway driving.', 5, NOW(), NOW(), true),
(2, 1, 'Great Value for Money', 'After 6 months of ownership, I can say this is the best car I have ever owned. The technology is cutting-edge and the build quality is excellent.', 5, NOW(), NOW(), true);

-- Sample reviews for Tesla Model Y
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 2, 'Perfect Family SUV', 'The Model Y is perfect for our family. Spacious interior, great safety features, and the performance is outstanding. Highly recommend for families looking to go electric.', 5, NOW(), NOW(), true),
(2, 2, 'Excellent Cargo Space', 'The cargo space is incredible. We can fit everything we need for road trips. The panoramic roof makes the interior feel even more spacious.', 4, NOW(), NOW(), true);

-- Sample reviews for Nissan Leaf
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 3, 'Reliable Daily Driver', 'The Leaf has been my daily driver for 2 years now. Very reliable and the range is sufficient for my needs. Great value for the price.', 4, NOW(), NOW(), true),
(2, 3, 'Good Entry-Level EV', 'Perfect for someone new to electric vehicles. Easy to drive, good features, and Nissan has excellent customer service.', 4, NOW(), NOW(), true);

-- Sample reviews for Chevrolet Bolt EV
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 4, 'Surprising Range', 'The Bolt EV has impressive range for its size. The regenerative braking is excellent and the car handles well in all conditions.', 4, NOW(), NOW(), true),
(2, 4, 'Compact but Spacious', 'Despite being compact, the interior is surprisingly spacious. Great for city driving and parking.', 3, NOW(), NOW(), true);

-- Sample reviews for Ford Mustang Mach-E
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 5, 'Mustang Heritage with Electric Power', 'Ford did an excellent job maintaining the Mustang spirit while going electric. The performance is incredible and the styling is bold.', 5, NOW(), NOW(), true),
(2, 5, 'Great Technology Integration', 'The SYNC system is intuitive and the driver assistance features work well. The range is competitive and charging is fast.', 4, NOW(), NOW(), true);

-- Sample reviews for Porsche Taycan
INSERT INTO reviews (user_id, ev_id, title, content, rating, created_at, updated_at, verified) VALUES
(2, 6, 'Ultimate Electric Sports Car', 'The Taycan is everything you would expect from Porsche. Incredible performance, precise handling, and stunning design. Worth every penny.', 5, NOW(), NOW(), true),
(2, 6, 'Luxury Meets Performance', 'This car redefines what an electric vehicle can be. The interior quality is exceptional and the driving dynamics are unmatched.', 5, NOW(), NOW(), true);

-- Verify the data was inserted
SELECT 'Reviews inserted:' as message, COUNT(*) as count FROM reviews;
SELECT 'Average rating by EV:' as message, ev_id, AVG(rating) as avg_rating, COUNT(*) as review_count 
FROM reviews 
GROUP BY ev_id 
ORDER BY ev_id; 