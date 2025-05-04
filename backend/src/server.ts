import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { SYSTEM_CONFIG } from './config/system';
import adminRoutes from './routes/admin';
import clientRoutes from './routes/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

adminRoutes(app);
clientRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});