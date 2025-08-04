# EV E-Commerce Platform - Cloud Deployment Guide

This guide will help you deploy the EV E-Commerce platform on free cloud platforms.

## 🚀 Quick Deploy Options

### Option 1: Render.com (Recommended - Completely Free for 90 days)

1. **Fork/Clone this repository** to your GitHub account
2. **Sign up** at [render.com](https://render.com)
3. **Connect your GitHub repository**
4. **Deploy using render.yaml**:
   - Go to your Render dashboard
   - Click "New" → "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file
   - Click "Apply" to deploy all services

**Free Tier Benefits:**
- 750 hours/month (enough for 24/7 deployment)
- PostgreSQL database included
- Automatic deployments from GitHub
- Custom domains

### Option 2: Railway.app ($5 credit/month)

1. **Sign up** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Deploy Backend**:
   - Create new service → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect the backend Dockerfile
   - Add PostgreSQL database from Railway's database service
4. **Deploy Frontend**:
   - Create another service for frontend
   - Use the frontend Dockerfile
   - Set environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`

### Option 3: Netlify + Railway (Hybrid)

1. **Deploy Backend on Railway** (as above)
2. **Deploy Frontend on Netlify**:
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `cd frontend/ev-frontend && npm install && npm run build`
   - Set publish directory: `frontend/ev-frontend/build`
   - Add environment variable: `REACT_APP_API_URL=https://your-backend-url.railway.app`

## 🔧 Environment Variables

### Backend Environment Variables
```bash
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:postgresql://your-db-host:5432/evdb
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
PORT=8080
```

### Frontend Environment Variables
```bash
REACT_APP_API_URL=https://your-backend-url.com
```

## 📊 Cost Comparison

| Platform | Backend | Frontend | Database | Total Cost |
|----------|---------|----------|----------|------------|
| Render.com | Free | Free | Free (90 days) | $0 (90 days), then $7/month |
| Railway.app | $5/month | $0 (Netlify) | Included | $5/month |
| Heroku | $7/month | $0 (Netlify) | $5/month | $12/month |

## 🐳 Local Development with Docker

To test the deployment locally:

```bash
# Clone the repository
git clone <your-repo-url>
cd ev-ecommerce

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# Database: localhost:5432
```

## 🔍 Health Check Endpoints

The backend includes health check endpoints for monitoring:

- **Health Check**: `GET /api/health`
- **Database Status**: `GET /api/health/db`

## 📝 Database Setup

After deployment, you'll need to initialize the database:

1. **Connect to your PostgreSQL database**
2. **Run the setup scripts**:
   ```sql
   -- Run these SQL files in order:
   -- 1. create_reviews_table.sql
   -- 2. insert_sample_evs.sql
   -- 3. insert_sample_reviews.sql
   ```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **CORS**: Configure CORS to only allow your frontend domain
3. **Database**: Use strong passwords and enable SSL connections
4. **HTTPS**: All production deployments should use HTTPS

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Failed**:
   - Check environment variables
   - Verify database is running
   - Check network connectivity

2. **CORS Errors**:
   - Update `CORS_ALLOWED_ORIGINS` environment variable
   - Ensure frontend URL is correct

3. **Build Failures**:
   - Check Dockerfile syntax
   - Verify all dependencies are included
   - Check build logs for specific errors

4. **Memory Issues**:
   - Reduce connection pool size in production config
   - Optimize JVM settings in Dockerfile

## 📞 Support

For deployment issues:
1. Check the platform's documentation
2. Review build logs
3. Verify environment variables
4. Test locally with Docker first

## 🎯 Next Steps

After successful deployment:
1. Set up custom domain (optional)
2. Configure SSL certificates
3. Set up monitoring and logging
4. Implement CI/CD pipeline
5. Add database backups 