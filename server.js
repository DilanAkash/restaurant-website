import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import CORS

// Create an instance of Express
const app = express();

// Set the port number
const PORT = process.env.PORT || 5000;

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/restaurantDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js'; // Import menu routes
import orderRoutes from './routes/orderRoutes.js'; // Import the order routes

// Use routes with the /api prefix
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes); // Ensure this comes after `app` is initialized
app.use('/api/orders', orderRoutes); // Add the order routes

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to ABC Restaurant API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
