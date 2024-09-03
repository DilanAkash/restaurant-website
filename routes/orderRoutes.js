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

// Route to get all orders (for staff/admin)
router.get('/all-orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email'); // Populate to get user details
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});

// Route to update an order status (for staff/admin)
router.put('/update-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated order after the modification
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status', error });
  }
});

export default router;
