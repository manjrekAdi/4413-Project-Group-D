#!/bin/bash

# Variables (edit if you want a different user/password/db)
DB_NAME="evdb"
DB_USER="postgres"
DB_PASS="postgres"

# Optional: Uncomment to create a new user instead of using 'postgres'
# NEW_USER="evuser"
# NEW_PASS="evpassword"

echo "Creating PostgreSQL database '$DB_NAME'..."

# Create the database (and optionally the user)
psql -U $DB_USER <<EOF
-- Uncomment the next two lines to create a new user
-- CREATE USER $NEW_USER WITH PASSWORD '$NEW_PASS';
-- GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $NEW_USER;

DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME') THEN
      CREATE DATABASE $DB_NAME;
   END IF;
END
$$;
EOF

echo "Database '$DB_NAME' created (or already exists)." 