import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import offerRoutes from './routes/offerRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url'; // fix __dirname erraor 

// required to set up the __dirname
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// instance of Express
const app = express();

// Set port num
const PORT = process.env.PORT || 5000;

// cross-origin requests
app.use(cors());

// 2 parse JSON bodies in requests
app.use(express.json());

// routes with api prefix
app.use('/api/reservations', reservationRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/payments', paymentRoutes);

// static files for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'client/src/assets/uploads')));

// mongodb connection using mongoose
mongoose.connect('mongodb://localhost:27017/restaurantDB', {
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to ABC Restaurant API');
});

// server starrt
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
