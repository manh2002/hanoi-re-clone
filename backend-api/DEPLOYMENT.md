# Deployment Guide

## Quick Start (Local Development)

1. **Set up MongoDB Atlas** (follow instructions in README.md)
2. **Configure environment variables** in `.env`:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret_at_least_32_characters
   ```
3. **Start the server**:
   ```bash
   npm run dev
   ```

## Production Deployment

### Heroku Deployment

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_secure_jwt_secret
   heroku config:set PORT=5000
   ```

3. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Railway Deployment

1. **Connect GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_connection_string`
   - `JWT_SECRET=your_secret`
3. **Deploy automatically** on push

### DigitalOcean App Platform

1. **Create new app** from GitHub repository
2. **Configure environment variables**
3. **Set build and run commands**:
   - Build: `npm install`
   - Run: `npm start`

## Environment Variables

### Required
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT tokens (min 32 characters)

### Optional
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `JWT_EXPIRE` - Token expiration time (default: 7d)
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

## Health Check

Test your deployment:
```bash
curl https://your-app-url.com/
```

Expected response:
```json
{
  "message": "Backend API Server is running!",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "posts": "/api/posts"
  }
}
```

## Security Checklist

- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Configure CORS for production domains
- [ ] Set up rate limiting
- [ ] Use HTTPS in production
- [ ] Whitelist specific IPs in MongoDB Atlas
- [ ] Enable MongoDB Atlas network access restrictions
- [ ] Set NODE_ENV=production
- [ ] Remove .env file from version control
