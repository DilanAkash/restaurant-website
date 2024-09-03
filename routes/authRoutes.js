import express from 'express';
import User from '../models/User.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import jsonwebtoken

const router = express.Router();

// Secret key for JWT (keep this safe and ideally in environment variables)
const JWT_SECRET = 'your_secret_key'; // Replace with your actual secret key

// User signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if the user already exists
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

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
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

// Update user profile
router.post('/update', async (req, res) => {
  try {
    const { userId, name, email, phone, password } = req.body;

    // Create an update object that only includes the fields that were provided
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (password) updateFields.password = password;

    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },  // Use $set to update only the provided fields
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile', error });
  }
});

export default router;
