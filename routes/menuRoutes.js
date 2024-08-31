import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Route to add a menu item
router.post('/add', async (req, res) => {
  try {
    // Validate request body
    const { name, category, description, price, image, isNewItem, isPopular } = req.body;
    if (!name || !category || !description || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new menu item using the updated schema
    const newItem = new MenuItem({
      name,
      category,
      description,
      price,
      image,
      isNew: isNewItem, // Ensure this matches your schema (update your schema if necessary)
      isPopular,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error: error.message });
  }
});

// Route to fetch all menu items
router.get('/all', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

export default router;
