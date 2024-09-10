import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

// User signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;  // Add role 

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, phone, password, role });  // Add role
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', userId: newUser._id });
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
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Respond with user details and role on successful login
    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      role: user.role,  // Return the role of the user
      name: user.name,  // Optionally return user's name for display
    });
  } catch (error) {
    console.error(error);  // Log the error to troubleshoot the error i got
    res.status(500).json({ message: 'Server error', error });
  }
});



// Fetch user data by ID
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if the userId is valid before querying
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId).select('-password'); // Fetch user data except the password
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

    // Check if the userId is valid before updating
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

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
