import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Fetch all messages for a given user
router.get('/user/:userId', async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

// Fetch all messages for admin/staff
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});

// Post a new message (Customer Query)
router.post('/', async (req, res) => {
  const newMessage = new Message({
    userId: req.body.userId,
    content: req.body.content,
  });
  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error sending message', error });
  }
});

// Update a message (Response from admin/staff)
router.put('/:messageId', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.messageId,
      { response: req.body.response, status: 'responded' },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating message', error });
  }
});

export default router;
