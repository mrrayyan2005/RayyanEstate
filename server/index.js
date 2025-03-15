import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { residencyRoute } from './routes/residencyRoute.js';
import { userRoute } from './routes/userRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(
  cors({
    origin: 'https://rayyan-estate.vercel.app', // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

// Handle preflight requests
app.options('*', cors()); // Allow preflight requests for all routes

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes that do NOT require JWT validation
app.use('/api/residency', residencyRoute);

// Routes that require JWT validation
app.use('/api/user', userRoute);

// Error handling for invalid tokens
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('Invalid token:', err.message); // Log the error
    res.status(401).json({ error: 'Invalid token' });
  } else {
    next(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
