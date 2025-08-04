-- Create the reviews table manually
-- Run this script before inserting sample review data

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    ev_id BIGINT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified BOOLEAN DEFAULT FALSE,
    
    -- Foreign key constraints
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_ev FOREIGN KEY (ev_id) REFERENCES electric_vehicles(id) ON DELETE CASCADE,
    
    -- Ensure one review per user per EV
    CONSTRAINT unique_user_ev_review UNIQUE (user_id, ev_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_ev_id ON reviews(ev_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at);

-- Verify the table was created
SELECT 'Reviews table created successfully' as message; 