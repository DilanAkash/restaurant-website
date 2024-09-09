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
import { fileURLToPath } from 'url'; // <-- Added this to fix __dirname issue

// These two lines are required to set up the __dirname constant in ES modules
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Create an instance of Express
const app = express();

// Set the port number
const PORT = process.env.PORT || 5000;

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Use routes with the /api prefix
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

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/restaurantDB', {
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to ABC Restaurant API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
