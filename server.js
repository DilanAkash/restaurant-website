import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors

// Create an instance of Express
const app = express();

// Set the port number
const PORT = process.env.PORT || 5000;

// Use cors middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/restaurantDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Import routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js'; // Import menu routes

// Use routes with the /api prefix
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes); // Ensure this comes after `app` is initialized

// Basic route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to ABC Restaurant API');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
