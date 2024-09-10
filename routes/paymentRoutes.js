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

// Route to update payment status
router.put('/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const { status } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { status }, // update status 
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(updatedPayment); // return te updated paymentt
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Failed to update payment status', error });
  }
});

export default router;
