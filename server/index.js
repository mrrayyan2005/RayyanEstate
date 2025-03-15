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
const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use('/api/user', userRoute)
app.use("/api/residency",residencyRoute)
