import express from 'express';
import multer from 'multer';
import path from 'path';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/src/assets/uploads/gallery'); // Path where you want to save the images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});
const upload = multer({ storage });

// Fetch all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

// Upload a new gallery image
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const imagePath = req.file ? `/uploads/gallery/${req.file.filename}` : null;

  const newImage = new Gallery({
    title,
    description,
    imagePath,
  });

  try {
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading image', error });
  }
});

export default router;
