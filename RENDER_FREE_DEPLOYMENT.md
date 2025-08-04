# 🚀 Render.com Free Deployment Guide

## ✅ Pre-Deployment (Completed)
- [x] All deployment files created
- [x] Code pushed to GitHub
- [x] Database initialization script ready

## 🔧 Free Deployment Steps (No Blueprint)

### Step 1: Create Render Account
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub account (recommended)
- [ ] Verify email address

### Step 2: Create PostgreSQL Database (Free for 90 days)
1. **Click "New"** → **"PostgreSQL"**
2. **Name**: `ev-postgres`
3. **Database**: `evdb`
4. **User**: `postgreuser`
5. **Region**: Choose closest to you
6. **Plan**: Free (90 days)
7. **Click "Create Database"**
8. **Save the connection details** (you'll need them later)

### Step 3: Deploy Backend Service
1. **Click "New"** → **"Web Service"**
2. **Connect your GitHub repository**: `manjrekAdi/4413-Project-Group-D`
3. **Configure the service**:
   - **Name**: `ev-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Branch**: `main`
   - **Build Command**: Leave empty (uses Dockerfile)
   - **Start Command**: Leave empty (uses Dockerfile)
4. **Add Environment Variables**:
   ```
   SPRING_PROFILES_ACTIVE=prod
   DATABASE_URL=postgresql://postgreuser:password@host:5432/evdb
   DB_USERNAME=postgreuser
   DB_PASSWORD=your_db_password
   CORS_ALLOWED_ORIGINS=https://ev-frontend.onrender.com
   ```
5. **Click "Create Web Service"**

### Step 4: Deploy Frontend Service
1. **Click "New"** → **"Static Site"**
2. **Connect your GitHub repository**: `manjrekAdi/4413-Project-Group-D`
3. **Configure the service**:
   - **Name**: `ev-frontend`
   - **Root Directory**: `frontend/ev-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://ev-backend.onrender.com
   ```
5. **Click "Create Static Site"**

## 📊 Expected URLs After Deployment

Your services will be available at:
- **Frontend**: `https://ev-frontend.onrender.com`
- **Backend**: `https://ev-backend.onrender.com`
- **Database**: Managed by Render (internal)

## 🗄️ Database Initialization

After successful deployment:

### Option 1: Using Render Shell
1. Go to your backend service in Render dashboard
2. Click "Shell" tab
3. Run these commands:
```bash
cd scripts
npm install
DATABASE_URL="your-render-db-url" npm run init
```

### Option 2: Using Local Script
1. Get your database URL from Render dashboard
2. Run locally:
```bash
cd scripts
npm install
DATABASE_URL="your-render-db-url" npm run init
```

## 🔍 Verification Steps

### Test Backend Health
- [ ] Visit: `https://ev-backend.onrender.com/api/health`
- [ ] Should return: `{"status":"UP","service":"EV E-Commerce Backend"}`

### Test Database Health
- [ ] Visit: `https://ev-backend.onrender.com/api/health/db`
- [ ] Should return: `{"status":"UP","database":"PostgreSQL"}`

### Test Frontend
- [ ] Visit: `https://ev-frontend.onrender.com`
- [ ] Should load the EV E-Commerce homepage
- [ ] Test browsing EVs
- [ ] Test user registration/login

## 💰 Cost Information

- **Backend**: Free (750 hours/month)
- **Frontend**: Free (unlimited)
- **Database**: Free for 90 days, then $7/month
- **Total Cost**: $0 for 90 days, then $7/month

## 🚨 Troubleshooting

### Common Issues:

**1. Build Failures**
- Check build logs in Render dashboard
- Verify all files are committed to GitHub
- Ensure Dockerfiles are correct

**2. Database Connection Issues**
- Verify environment variables are set correctly
- Check database URL format
- Ensure SSL settings are correct

**3. CORS Errors**
- Verify frontend URL in backend CORS settings
- Check environment variables

**4. Frontend API Calls Failing**
- Verify `REACT_APP_API_URL` environment variable
- Check backend is running and accessible

## 📞 Support

If you encounter issues:
1. Check Render documentation
2. Review build logs carefully
3. Verify all environment variables
4. Test endpoints individually

## 🎉 Success Indicators

Your deployment is successful when:
- [ ] Frontend loads without errors
- [ ] Backend health check passes
- [ ] Database health check passes
- [ ] You can browse EVs
- [ ] You can register/login users
- [ ] You can add items to cart

## 🔄 Updates

To update your application:
1. Make changes locally
2. Commit and push to GitHub
3. Render will automatically redeploy
4. No manual intervention needed

---

**This deployment method is completely free! 🚀** 