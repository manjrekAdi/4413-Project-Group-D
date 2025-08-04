# 🔧 Render.com Environment Variables Reference

## Backend Service Environment Variables

Add these to your backend service in Render dashboard:

```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgresql://postgreuser:your_password@your_host:5432/evdb
DB_USERNAME=postgreuser
DB_PASSWORD=your_database_password
CORS_ALLOWED_ORIGINS=https://ev-frontend.onrender.com
PORT=8080
```

## Frontend Service Environment Variables

Add this to your frontend service in Render dashboard:

```
REACT_APP_API_URL=https://ev-backend.onrender.com
```

## How to Get Database Connection Details

1. Go to your PostgreSQL service in Render dashboard
2. Click on the service
3. Go to "Connections" tab
4. Copy the "External Database URL"
5. Use this as your `DATABASE_URL`

## Example Database URL Format

```
postgresql://postgreuser:password123@dpg-abc123-a.oregon-postgres.render.com:5432/evdb
```

## Important Notes

- Replace `your_password`, `your_host`, and `your_database_password` with actual values from your Render PostgreSQL service
- The `CORS_ALLOWED_ORIGINS` should match your frontend URL exactly
- The `REACT_APP_API_URL` should match your backend URL exactly
- All URLs should use `https://` in production 