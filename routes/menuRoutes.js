import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Route to add a menu item
router.post('/add', async (req, res) => {
  try {
    // Create a new menu item using the updated schema
    const newItem = new MenuItem({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      isNewItem: req.body.isNewItem, // Updated field
      isPopular: req.body.isPopular,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error });
  }
});

// Route to fetch all menu items
router.get('/all', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

export default router;
