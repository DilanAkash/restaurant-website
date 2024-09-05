import express from 'express';
import Promo from '../models/Promo.js';  // Assuming you have a Promo model created
const router = express.Router();

// Create a new promo code
router.post('/create', async (req, res) => {
  const { code, discountPercentage, validTill } = req.body;
  try {
    const newPromo = new Promo({
      code,
      discountPercentage,
      validTill,
    });
    const savedPromo = await newPromo.save();
    res.status(201).json(savedPromo);
  } catch (error) {
    res.status(400).json({ message: 'Error creating promo code', error });
  }
});

// Validate promo code
router.post('/validate', async (req, res) => {
  const { code } = req.body;
  try {
    const promo = await Promo.findOne({ code, validTill: { $gte: new Date() } });
    if (promo) {
      res.status(200).json(promo);
    } else {
      res.status(404).json({ message: 'Promo code is invalid or expired' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error validating promo code', error });
  }
});

// Fetch all available promos
router.get('/', async (req, res) => {
  try {
    const promos = await Promo.find({ validTill: { $gte: new Date() } });
    res.status(200).json(promos);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching promos', error });
  }
});

export default router;
