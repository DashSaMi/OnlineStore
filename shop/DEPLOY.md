# Deploying the Shop Application to Vercel

## Prerequisites
1. A Vercel account
2. A MongoDB database
3. Google OAuth credentials

## Environment Variables
Set up the following environment variables in your Vercel project settings:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_uri_here
MONGODB_DB_NAME=SamanOnlineShop

# NextAuth Configuration
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_DEBUG=false

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# API Configuration
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app/api
```

## Deployment Steps

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your repository
4. Select the `deploy-shop` branch
5. Configure project with these settings:
   - Framework Preset: Next.js
   - Root Directory: `shop`
   - Build Command: (leave as default)
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Add all environment variables listed above
7. Click "Deploy"

## Post-Deployment

1. Update Google OAuth credentials with your Vercel domain
2. Test the authentication flow
3. Verify MongoDB connection
4. Test the shopping cart functionality

## Troubleshooting

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Ensure MongoDB connection string is accessible from Vercel