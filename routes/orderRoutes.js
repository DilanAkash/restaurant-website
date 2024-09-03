import express from 'express';
import Order from '../models/Order.js';

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

// Route to fetch orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ date: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// Route to cancel an order
router.delete('/cancel-order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
});

export default router;
