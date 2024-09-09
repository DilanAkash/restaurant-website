import express from 'express';
import multer from 'multer'; // Import multer for file uploads
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/src/assets/uploads'); // Folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save files with a unique name
  }
});

const upload = multer({ storage }); // Initialize multer with the storage configuration

// Route to add a menu item with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, price, isNewItem, isPopular } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }

    // Create a new menu item with the uploaded image
    const newItem = new MenuItem({
      name,
      category,
      description,  // Optional
      price,
      image,  // Save image path
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
