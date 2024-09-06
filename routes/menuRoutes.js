import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Route to add a menu item
router.post('/add', async (req, res) => {
  try {
    const { name, category, description, price, image, isNewItem, isPopular } = req.body;

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    // Create a new menu item using the updated schema
    const newItem = new MenuItem({
      name,
      category,
      description,  // Optional, if your schema allows it to be empty
      price,
      image,  // Optional, if your schema allows it to be empty
      isNewItem, // Adjusted to match the schema field name if necessary
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

// Route to delete a menu item by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.json({ message: 'Menu item deleted successfully', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
});

export default router;
