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
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://globalgrantshub.org'] 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes); 
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', fundingRoutes);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
📁 API endpoints available at http://localhost:${PORT}/api
🔒 Admin dashboard at http://localhost:${PORT}/dashboard (requires admin login)
  `);
});
