import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

// Create a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // validation for required fields
    if (!name || !email || !phone || !password) {
      return res.status(400).send('All fields are required');
    }

    // Create and save the new user
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// Update user details
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, role, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, role, password },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});


// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users: ' + error.message);
  }
});

export default router;
