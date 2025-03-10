# Global Grants Hub

A platform designed to empower civil society organizations, NGOs, entrepreneurs, and students by providing daily funding opportunities, resources, and support.

## Features

- Daily funding opportunity updates
- Grant application support resources
- Role-based content management
- Interactive funding call details
- Secure admin controls
- MongoDB integration
- TypeScript throughout

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite as build tool
- Styled Components
- React Router DOM
- React Query
- Framer Motion

### Backend
- Node.js with TypeScript
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Role-based Authorization

## Deployment Guide

### Prerequisites

1. Create accounts on:
   - Vercel (frontend deployment)
   - Railway.app or Render (backend deployment)
   - MongoDB Atlas (database)

2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard:
   ```
   VITE_API_URL=your-backend-url
   VITE_APP_ENV=production
   ```
4. Deploy using Vercel dashboard or CLI:
   ```bash
   vercel
   ```

### Backend Deployment (Railway/Render)

1. Configure environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-secure-jwt-secret
   FRONTEND_URL=your-vercel-frontend-url
   ```

2. For Railway:
   - Connect your GitHub repository
   - Set environment variables
   - Railway will automatically deploy

3. For Render:
   - Create a new Web Service
   - Connect your repository
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`

### Database Setup (MongoDB Atlas)

1. Create a new cluster
2. Set up database access:
   - Create a database user
   - Set up network access (IP whitelist)
3. Get your connection string
4. Add it to your backend environment variables

## Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GGH-website
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both root and backend directories
   - Fill in the required values

4. Start development servers:
   ```bash
   # Start frontend
   npm run dev

   # Start backend
   cd backend
   npm run dev
   ```

## Production Build

### Frontend
```bash
npm run build
```

### Backend
```bash
cd backend
npm run build
```

## Security Considerations

- All environment variables must be properly set in production
- Enable rate limiting and CORS protection
- Keep MongoDB Atlas access restricted
- Regularly update dependencies
- Monitor application logs
- Set up proper error tracking
- Enable SSL/TLS

## Monitoring and Maintenance

- Set up monitoring on Vercel/Railway dashboard
- Monitor MongoDB Atlas metrics
- Set up error tracking (e.g., Sentry)
- Regular dependency updates
- Database backups
- Performance monitoring

## Support

For any issues or questions, please open an issue in the repository.

## License

This project is licensed under the MIT License.
