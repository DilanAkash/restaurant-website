import express from 'express';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';

const router = express.Router();

// Route to place an order and save payment info
router.post('/place-order', async (req, res) => {
  try {
    const { userId, items, total, paymentMethod } = req.body;

    // Validate the required fields
    if (!userId || !items || !total || !paymentMethod) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new order
    const newOrder = new Order({
      user: userId,
      items,
      total,
      paymentMethod,
      date: new Date(),
    });

    await newOrder.save();

    // Save payment info
    const payment = new Payment({
      user: userId,
      orderId: newOrder._id,
      amount: total,
      paymentMethod,
      date: new Date(),
      status: paymentMethod === 'Card Payment' ? 'Paid' : 'Pending', // Set status based on payment method
    });
    await payment.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
});

// Route to fetch orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ date: -1 }); // Use 'date' field
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Route to cancel an order
router.delete('/cancel-order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

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
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
});

// Route to update an order status (for staff/admin)
router.put('/update-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

export default router;
