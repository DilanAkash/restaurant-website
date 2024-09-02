import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';  // Import the User model to link orders with users

const router = express.Router();

// Route to place an order
router.post('/place-order', async (req, res) => {
  try {
    const { userId, items, total, paymentMethod } = req.body;

    // Create a new order
    const newOrder = new Order({
      user: userId,
      items,
      total,
      paymentMethod,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error });
  }
});

export default router;
