# Deployment Guide

This guide will help you deploy the Registration and Login System to production.

## Architecture

- **Backend**: Node.js/Express API (deployed to Render)
- **Frontend**: React SPA (deployed to Netlify)
- **Database**: MongoDB Atlas (already configured)

## Step 1: Deploy Backend to Render (Free)

### Option A: Using Render Dashboard (Recommended)

1. **Create Render Account**
   - Go to https://render.com
   - Sign up for a free account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository: `Praveenkumar-22072004/registerlogin01`

3. **Configure Service**
   - **Name**: register-login-backend
   - **Branch**: main
   - **Root Directory**: Leave empty (root of repo)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Runtime**: Node

4. **Environment Variables**
   Add these environment variables:
   ```
   MONGODB_URI = mongodb+srv://viruthika:Viruthika2006@cluster0.zc8zpbn.mongodb.net/?appName=Cluster0&retryWrites=true&w=majority
   JWT_SECRET = your_secure_random_secret_here
   PORT = 10000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (2-3 minutes)
   - Copy the backend URL (e.g., `https://register-login-backend.onrender.com`)

### Option B: Using render.yaml (Automatic)

1. Push your code to GitHub (already done)
2. Go to https://dashboard.render.com/
3. Click "New +"
4. Select "Blueprints"
5. Connect your GitHub repository
6. Render will automatically detect and deploy using `render.yaml`

## Step 2: Update Frontend API URL

After deploying the backend, update the frontend to point to the deployed backend:

1. Open `client/src/App.js`
2. Find line 5: `axios.defaults.baseURL = 'http://localhost:5000';`
3. Replace with your Render backend URL:
   ```javascript
   axios.defaults.baseURL = 'https://register-login-backend.onrender.com';
   ```

4. Commit and push changes:
   ```bash
   git add client/src/App.js
   git commit -m "Update API URL for production"
   git push
   ```

## Step 3: Deploy Frontend to Netlify

### Option A: Using Netlify Dashboard (Recommended)

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up for a free account

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository: `Praveenkumar-22072004/registerlogin01`

3. **Configure Build Settings**
   - **Build command**: `cd client && npm run build`
   - **Publish directory**: `client/build`
   - **Base directory**: Leave empty

4. **Environment Variables** (Optional)
   - Add any frontend environment variables if needed

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your site will be live at a URL like: `https://your-site-name.netlify.app`

### Option B: Using Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Step 4: Test the Deployed Application

1. **Backend Test**
   - Visit your Render backend URL
   - You should see a response or the server is running

2. **Frontend Test**
   - Visit your Netlify frontend URL
   - Try registering a new user
   - Try logging in
   - Try adding/deleting members

## Important Notes

### MongoDB Atlas
- Ensure your IP is whitelisted in MongoDB Atlas Network Access
- For production, consider using a more secure connection approach

### Environment Variables
- Never commit `.env` files to GitHub
- Use strong, random secrets for JWT_SECRET in production
- Rotate secrets periodically

### CORS
- The backend already has CORS enabled for all origins
- For production, you may want to restrict CORS to your Netlify domain

### Performance
- Render free tier spins down after inactivity (cold starts)
- Netlify offers excellent performance for static sites
- Consider upgrading to paid tiers for better performance

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify environment variables are set correctly
- Ensure MongoDB connection string is valid

### Frontend Issues
- Check Netlify deploy logs
- Verify the API URL is correct
- Check browser console for errors

### Connection Issues
- Ensure MongoDB Atlas IP whitelist includes Render's IP ranges
- Check that both services are running
- Verify CORS configuration

## URLs After Deployment

- **Backend**: `https://register-login-backend.onrender.com`
- **Frontend**: `https://register-login-frontend.netlify.app`
- **Database**: MongoDB Atlas (already configured)

## Next Steps

1. Monitor your deployments
2. Set up error tracking (e.g., Sentry)
3. Add analytics (e.g., Google Analytics)
4. Implement rate limiting for API endpoints
5. Add proper logging and monitoring
6. Consider adding a CI/CD pipeline

## Support

- Render Documentation: https://render.com/docs
- Netlify Documentation: https://docs.netlify.com
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
