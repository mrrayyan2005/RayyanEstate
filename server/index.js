import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { residencyRoute } from './routes/residencyRoute.js';
import { userRoute } from './routes/userRoute.js';
import jwtCheck from './auth0Config.js'; // Import the JWT middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'https://rayyan-estate.vercel.app', // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

// Use the JWT middleware for protected routes
app.use(jwtCheck);

// Error handling for invalid tokens
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('Invalid token:', err.message); // Log the error
    res.status(401).json({ error: 'Invalid token' });
  } else {
    next(err);
  }
});

// Routes
app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
