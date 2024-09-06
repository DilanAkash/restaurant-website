import express from 'express';
import Service from '../models/Service.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Fetch all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error });
  }
});

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/src/assets/uploads'); // Path where you want to save the images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});
const upload = multer({ storage });

// Add a new service with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

  const newService = new Service({
    title,
    description,
    image: imagePath, // Save the image path in the database
  });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: 'Error adding service', error });
  }
});

// Update a service
router.put('/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: 'Error updating service', error });
  }
});

// Delete a service
router.delete('/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    res.json(deletedService);
  } catch (error) {
    res.status(400).json({ message: 'Error deleting service', error });
  }
});

export default router;
