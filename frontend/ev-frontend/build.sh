#!/bin/bash

echo "🚀 Building EV E-Commerce Frontend..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Set environment variable for production
export REACT_APP_API_URL=https://four413-project-group-d-6.onrender.com

# Build the application
echo "🔨 Building React application..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build output in: ./build" 