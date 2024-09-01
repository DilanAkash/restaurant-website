import express from 'express';
import User from '../models/User.js';  // Remember, Dilan, this gave you trouble

const router = express.Router();

// The User signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // To check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);  // Log the error to troubleshoot
    res.status(500).json({ message: 'Server error', error });
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and the password matches
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    console.error(error);  // Log the error to troubleshoot
    res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch user data by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Fetch user data except the password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
