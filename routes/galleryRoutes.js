import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/src/assets/uploads/gallery'); 
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

// Delete an image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete the image from the file system
    const imagePath = path.join('client/src/assets', image.imagePath);
    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
        return res.status(500).json({ message: 'Error deleting image file' });
      }

      // Delete the image from the database
      await Gallery.findByIdAndDelete(req.params.id);
      res.json({ message: 'Image deleted successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
});

export default router;
