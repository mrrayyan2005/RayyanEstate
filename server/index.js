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
app.use(cors({
    origin: ["http://localhost:8000", "https://rayyan-estate.vercel.app"], // Allow frontend
    credentials: true,  // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use('/api/user', userRoute)
app.use("/api/residency",residencyRoute)
