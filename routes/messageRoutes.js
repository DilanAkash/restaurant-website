import express from 'express';
import Message from '../models/Message.js'; // Ensure the path to the Message model is correct

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

// Update a message (response from admin/staff)
router.put('/:messageId', async (req, res) => {
    try {
      const { messageId } = req.params; // Get the messageId from the URL
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId, // Ensure messageId is passed correctly as ObjectId
        { response: req.body.response, status: 'responded' }, // Update response and status
        { new: true } // Return the updated document
      );
      res.json(updatedMessage);
    } catch (error) {
      res.status(400).json({ message: 'Error updating message', error });
    }
  });
  

export default router;
