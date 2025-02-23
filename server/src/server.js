import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDB from './config/db.js'
import authRouter from './routes/auth.route.js'
import adminProductRouter from './routes/admin/product.route.js'
import ProductRouter from './routes/shop/product.route.js'


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Express',
        'Pragma'
    ],
    credentials: true
}))

// Routes
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter);
app.use('/api/shop/products', ProductRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));