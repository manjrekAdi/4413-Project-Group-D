const { Client } = require('pg');

// Database connection configuration
const config = {
  connectionString: process.env.DATABASE_URL || 'postgresql://postgreuser:adiman05@localhost:5432/evdb',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

async function initializeDatabase() {
  const client = new Client(config);
  
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected successfully!');

    // Create reviews table if it doesn't exist
    console.log('Creating reviews table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        ev_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert sample EVs
    console.log('Inserting sample EVs...');
    await client.query(`
      INSERT INTO evs (id, name, brand, price, range_km, battery_capacity, charging_time, image_url, description) 
      VALUES 
        (1, 'Tesla Model 3', 'Tesla', 45000, 350, 75, 8, 'https://example.com/tesla-model-3.jpg', 'Electric sedan with advanced autopilot'),
        (2, 'Nissan Leaf', 'Nissan', 32000, 240, 62, 7, 'https://example.com/nissan-leaf.jpg', 'Affordable electric vehicle'),
        (3, 'Chevrolet Bolt', 'Chevrolet', 38000, 259, 66, 9, 'https://example.com/chevrolet-bolt.jpg', 'Compact electric hatchback'),
        (4, 'BMW i3', 'BMW', 52000, 153, 42, 4, 'https://example.com/bmw-i3.jpg', 'Luxury electric vehicle'),
        (5, 'Audi e-tron', 'Audi', 75000, 222, 95, 10, 'https://example.com/audi-etron.jpg', 'Premium electric SUV')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert sample users
    console.log('Inserting sample users...');
    await client.query(`
      INSERT INTO users (id, username, email, password, role) 
      VALUES 
        (1, 'admin', 'admin@evcommerce.com', 'admin123', 'ADMIN'),
        (2, 'customer1', 'customer1@example.com', 'password123', 'CUSTOMER'),
        (3, 'customer2', 'customer2@example.com', 'password123', 'CUSTOMER')
      ON CONFLICT (id) DO NOTHING;
    `);

    // Insert sample reviews
    console.log('Inserting sample reviews...');
    await client.query(`
      INSERT INTO reviews (ev_id, user_id, rating, comment) 
      VALUES 
        (1, 2, 5, 'Amazing car! The autopilot feature is incredible.'),
        (1, 3, 4, 'Great performance and range. Highly recommended.'),
        (2, 2, 4, 'Good value for money. Perfect for daily commute.'),
        (3, 3, 3, 'Decent car but charging time could be better.'),
        (4, 2, 5, 'Luxury feel with great handling.'),
        (5, 3, 4, 'Spacious and comfortable. Great for family trips.')
      ON CONFLICT DO NOTHING;
    `);

    console.log('Database initialization completed successfully!');
    
    // Display summary
    const evCount = await client.query('SELECT COUNT(*) FROM evs');
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const reviewCount = await client.query('SELECT COUNT(*) FROM reviews');
    
    console.log('\nDatabase Summary:');
    console.log(`- EVs: ${evCount.rows[0].count}`);
    console.log(`- Users: ${userCount.rows[0].count}`);
    console.log(`- Reviews: ${reviewCount.rows[0].count}`);

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the initialization
initializeDatabase(); 