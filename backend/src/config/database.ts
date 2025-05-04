// backend/src/config/database.ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', (err as Error).message);
    process.exit(1); // Thoát nếu không kết nối được
  }
};