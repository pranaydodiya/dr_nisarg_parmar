import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db.js';

import authRoutes from './routes/auth.js';
import locationsRoutes from './routes/locations.js';
import testimonialsRoutes from './routes/testimonials.js';
import blogsRoutes from './routes/blogs.js';
import settingsRoutes from './routes/settings.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', locationsRoutes);
app.use('/api', testimonialsRoutes);
app.use('/api', blogsRoutes);
app.use('/api', settingsRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Start Server
async function startServer() {
  try {
    await connectToDatabase();
    
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
}

startServer();
