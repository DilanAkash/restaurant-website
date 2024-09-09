import express from 'express';
import Payment from '../models/Payment.js';

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();  // Get all payments
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error });
  }
});

// Get payments for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const payments = await Payment.find({ user: userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
});

export default router;
