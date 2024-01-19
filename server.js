import express from 'express'
import morgan from 'morgan';
import dotenv from 'dotenv'
import connectDB from './config/db.js';

import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config()

// rest object
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dbconfig

connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')));


// Routes

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})