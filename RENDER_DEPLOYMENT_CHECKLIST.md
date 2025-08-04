# 🚀 Render.com Deployment Checklist

## ✅ Pre-Deployment (Completed)
- [x] All deployment files created
- [x] Code pushed to GitHub
- [x] Database initialization script ready

## 🔧 Render.com Setup Steps

### Step 1: Create Render Account
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub account (recommended)
- [ ] Verify email address

### Step 2: Deploy Blueprint
- [ ] Click "New" in Render dashboard
- [ ] Select "Blueprint"
- [ ] Connect GitHub account if not already connected
- [ ] Select repository: `manjrekAdi/4413-Project-Group-D`
- [ ] Render will auto-detect `render.yaml`
- [ ] Click "Apply" to start deployment

### Step 3: Monitor Deployment
- [ ] Watch build logs for backend service
- [ ] Watch build logs for frontend service
- [ ] Wait for database to be created
- [ ] Note down the generated URLs

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

## 🚨 Troubleshooting

### Common Issues:

**1. Build Failures**
- Check build logs in Render dashboard
- Verify all files are committed to GitHub
- Ensure Dockerfiles are correct

**2. Database Connection Issues**
- Verify environment variables are set
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

## 💰 Cost Information

- **Free Tier**: 750 hours/month (enough for 24/7)
- **Database**: Free for 90 days, then $7/month
- **Total Cost**: $0 for 90 days, then $7/month

## 🔄 Updates

To update your application:
1. Make changes locally
2. Commit and push to GitHub
3. Render will automatically redeploy
4. No manual intervention needed

---

**Good luck with your deployment! 🚀** 