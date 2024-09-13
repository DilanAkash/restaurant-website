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
import { fileURLToPath } from 'url'; 

// Setting up __dirname
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Instance of Express
const app = express();

// Set port number
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API routes
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

// Serve static files for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'client/src/assets/uploads')));

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://dilanakash27:aq2m1NMaU2TKXjrg@abc.qqyqt.mongodb.net/restaurantDB?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to ABC Restaurant API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
