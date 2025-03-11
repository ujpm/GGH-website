import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './src/routes/auth.routes';
import contentRoutes from './src/routes/content.routes';
import dashboardRoutes from './src/routes/dashboard.routes';
import fundingRoutes from './src/routes/fundingRoutes';
import './src/models/user.model';
import './src/models/content.model';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
console.log('🔄 Attempting to connect to MongoDB...');
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? [process.env.FRONTEND_URL, 'https://globalgrantshub.org']
      : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Global Grants Hub API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/funding', fundingRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`
      📁 API endpoints available at http://localhost:${PORT}/api
      🔒 Admin dashboard at http://localhost:${PORT}/dashboard
    `);
  }
});
