-- Insert sample electric vehicles into the database
-- Run this script after creating the database and tables

INSERT INTO electric_vehicles (model, brand, description, price, range_km, battery_capacity_kwh, charging_time_hours, image_url, category, available) VALUES
('Model 3', 'Tesla', 'The Tesla Model 3 is an electric compact sedan with advanced autopilot capabilities.', 45000.00, 350, 75, 8, 'https://example.com/tesla-model-3.jpg', 'SEDAN', true),
('Model Y', 'Tesla', 'The Tesla Model Y is a compact electric SUV with spacious interior and excellent range.', 55000.00, 330, 75, 8, 'https://example.com/tesla-model-y.jpg', 'SUV', true),
('Leaf', 'Nissan', 'The Nissan Leaf is a reliable electric hatchback perfect for daily commuting.', 32000.00, 240, 62, 7, 'https://example.com/nissan-leaf.jpg', 'COMPACT', true),
('Bolt EV', 'Chevrolet', 'The Chevrolet Bolt EV offers impressive range in a compact package.', 35000.00, 259, 66, 9, 'https://example.com/chevrolet-bolt.jpg', 'COMPACT', true),
('Mustang Mach-E', 'Ford', 'The Ford Mustang Mach-E combines iconic styling with electric performance.', 48000.00, 300, 68, 10, 'https://example.com/ford-mach-e.jpg', 'SUV', true),
('Taycan', 'Porsche', 'The Porsche Taycan is a high-performance electric sports car.', 85000.00, 282, 93, 9, 'https://example.com/porsche-taycan.jpg', 'SPORTS', true);

-- Insert sample users
INSERT INTO users (username, email, password, role, active) VALUES
('admin', 'admin@evcommerce.com', 'admin123', 'ADMIN', true),
('customer', 'customer@evcommerce.com', 'customer123', 'CUSTOMER', true);

-- Verify the data was inserted
SELECT 'EVs inserted:' as message, COUNT(*) as count FROM electric_vehicles;
SELECT 'Users inserted:' as message, COUNT(*) as count FROM users; 