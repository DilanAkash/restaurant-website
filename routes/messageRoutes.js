import express from 'express';
import Message from '../models/Message.js'; // Make sure the path and import name match your setup

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

// Post a new message
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

export default router;
