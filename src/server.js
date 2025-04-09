import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});


app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log(error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed:', err);
  });
