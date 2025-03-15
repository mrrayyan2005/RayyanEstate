import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { residencyRoute } from './routes/residencyRoute.js';
import { userRoute } from './routes/userRoute.js';
dotenv.config()


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'https://rayyan-estate.vercel.app', // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);



app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use('/api/user', userRoute)
app.use("/api/residency",residencyRoute)
