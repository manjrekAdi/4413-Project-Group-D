# EV E-Commerce Platform - Render.com Deployment Guide (Free Method)

## 🚀 Overview
This guide will help you deploy your EV E-Commerce platform to Render.com using the **free manual deployment method**, making it cloud-native and accessible via HTTPS.

## 📋 Prerequisites
- GitHub repository with your code
- Render.com account (free)
- Basic understanding of environment variables

## 🔧 Pre-Deployment Setup

### 1. Repository Structure
Your repository should have this structure:
```
ev-ecommerce/
├── backend/
│   ├── Dockerfile
│   ├── Procfile
│   ├── pom.xml
│   └── src/
├── frontend/
│   └── ev-frontend/
│       ├── package.json
│       └── src/
└── README.md
```

### 2. Environment Configuration
The application is configured to use:
- **Development**: `localhost:8080` (local development)
- **Production**: `https://ev-ecommerce-backend.onrender.com` (Render deployment)

### 3. Maven Wrapper Setup
The project includes Maven wrapper files (`mvnw` and `.mvn` directory) that are required for Docker builds. These files have been generated and are included in the repository.

## 🌐 Deployment Steps (Free Method)

### Step 1: Deploy Backend to Render

1. **Sign up for Render.com**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `https://github.com/manjrekAdi/4413-Project-Group-D.git`

3. **Configure Backend Service**
   ```
   Name: ev-ecommerce-backend
   Environment: Docker
   Root Directory: backend/
   ```

4. **Add Environment Variables**
   ```
   SPRING_PROFILES_ACTIVE=prod
   CORS_ORIGINS=https://ev-ecommerce-frontend.onrender.com
   LOG_LEVEL=INFO
   SHOW_SQL=false
   FORMAT_SQL=false
   ```

5. **Deploy Backend**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Note the URL: `https://ev-ecommerce-backend.onrender.com`

### Step 2: Create PostgreSQL Database

1. **Create New PostgreSQL Database**
   - Click "New +" → "PostgreSQL"
   - Name: `ev-ecommerce-db`
   - Database: `evdb`
   - User: `postgreuser`

2. **Link Database to Backend**
   - Go to your backend service settings
   - Add environment variables from database:
     - `DATABASE_URL` (auto-populated)
     - `DATABASE_USERNAME` (auto-populated)
     - `DATABASE_PASSWORD` (auto-populated)

### Step 3: Deploy Frontend to Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Connect the same GitHub repository

2. **Configure Frontend Service**
   ```
   Name: ev-ecommerce-frontend
   Build Command: cd frontend/ev-frontend && npm install && npm run build
   Publish Directory: frontend/ev-frontend/build
   ```

3. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://ev-ecommerce-backend.onrender.com
   REACT_APP_ENVIRONMENT=production
   ```

4. **Deploy Frontend**
   - Click "Create Static Site"
   - Render will build and deploy automatically
   - Note the URL: `https://ev-ecommerce-frontend.onrender.com`

### Step 4: Initialize Database

1. **Access Backend Logs**
   - Go to your backend service in Render
   - Click "Logs" tab
   - Wait for the application to start

2. **Verify Database Connection**
   - Check logs for successful database connection
   - Tables should be created automatically by JPA

3. **Insert Sample Data (Optional)**
   - You can manually insert data via the API endpoints
   - Or add a data initialization script

## 🔍 Post-Deployment Verification

### 1. Test Backend API
```bash
# Test health endpoint
curl https://ev-ecommerce-backend.onrender.com/api/evs

# Test chatbot
curl https://ev-ecommerce-backend.onrender.com/api/chatbot/health
```

### 2. Test Frontend
- Visit: `https://ev-ecommerce-frontend.onrender.com`
- Test all features:
  - Browse EVs
  - Add to cart
  - Use Virtual Assistant
  - Loan calculator
  - Reviews

### 3. Test HTTPS Security
- Verify URLs start with `https://`
- Check browser shows secure connection
- Test CORS functionality

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures - Missing Maven Wrapper Files**
   - **Error**: `failed to calculate checksum of ref: "/mvnw": not found` or `"/.mvn": not found`
   - **Solution**: Ensure `mvnw` and `.mvn` directory are present in the backend directory
   - **Fix**: Run `mvn wrapper:wrapper` in the backend directory to generate missing files

2. **Build Failures**
   - Check build logs in Render dashboard
   - Verify Dockerfile is in backend directory
   - Ensure Maven dependencies in `pom.xml`

2. **Database Connection Issues**
   - Verify environment variables are set correctly
   - Check database is running and accessible
   - Review connection logs

3. **CORS Errors**
   - Verify `FRONTEND_URL` environment variable
   - Check CORS configuration in `application-prod.properties`

4. **Frontend API Calls Failing**
   - Verify `REACT_APP_API_URL` is set correctly
   - Check network tab in browser dev tools
   - Ensure backend is running and accessible

### Debug Commands:
```bash
# Check backend logs
# Go to Render dashboard → Backend service → Logs

# Test API endpoints
curl -X GET https://ev-ecommerce-backend.onrender.com/api/evs
curl -X POST https://ev-ecommerce-backend.onrender.com/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

## 📊 Monitoring

### Render Dashboard Features:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory usage
- **Deployments**: Build and deployment history
- **Environment Variables**: Manage configuration

### Health Checks:
- Backend: `https://ev-ecommerce-backend.onrender.com/api/chatbot/health`
- Frontend: Load the main page successfully

## 🔒 Security Features

### Automatic HTTPS:
- Render provides free SSL certificates
- All traffic is encrypted
- Meets security requirements for demo

### Environment Variables:
- Database credentials are secure
- API keys and secrets are protected
- No sensitive data in code

## 💰 Cost Information

### Free Tier Limits:
- **Backend**: 750 hours/month (enough for demo)
- **Frontend**: Unlimited static site hosting
- **Database**: 1GB storage, 90 days retention

### Paid Options (if needed):
- **Backend**: $7/month for unlimited hours
- **Database**: $7/month for persistent storage

## 🎯 For EECS 4413 Demo

### Demo URLs:
- **Frontend**: `https://ev-ecommerce-frontend.onrender.com`
- **Backend API**: `https://ev-ecommerce-backend.onrender.com`

### Demo Checklist:
- [ ] Both services deployed successfully
- [ ] HTTPS working (secure connection)
- [ ] All features functional
- [ ] Database connected and working
- [ ] Virtual Assistant responding
- [ ] Cart functionality working
- [ ] Reviews system working
- [ ] Loan calculator working

### Demo Script:
1. "This is our cloud-native EV E-Commerce platform"
2. "It's deployed on Render.com with automatic HTTPS"
3. "The backend is a Spring Boot API with PostgreSQL database"
4. "The frontend is a React application"
5. "Let me demonstrate the key features..."

## 🚀 Next Steps

After successful deployment:
1. **Test all functionality** thoroughly
2. **Document any issues** and solutions
3. **Prepare demo script** with live URLs
4. **Practice demo** with the live application
5. **Backup configuration** for future reference

## 📞 Support

If you encounter issues:
1. Check Render documentation: [docs.render.com](https://docs.render.com)
2. Review application logs in Render dashboard
3. Test locally first to isolate issues
4. Check environment variables configuration

---

**Good luck with your EECS 4413 demo! 🎉** 